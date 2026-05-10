import express from "express";
import { getSheetData } from "../src/services/sheetsService.js";

const apiRouter = express.Router();

apiRouter.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Check Google Sheets config status
apiRouter.get("/sheets/config-status", (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    res.json({ 
      configured: !!sheetId && (!!apiKey || !!clientEmail),
      hasSheetId: !!sheetId,
      authType: clientEmail ? 'service-account' : (apiKey ? 'api-key' : 'none')
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Dynamic data endpoints using Google Sheets
apiRouter.get("/data/:type", async (req, res) => {
  try {
    if (!process.env.GOOGLE_SHEET_ID) {
      return res.status(404).json({ error: "Google sheets are not configured" });
    }

    const { type } = req.params;
    
    let sheetName = "";
    if (type === "products") sheetName = "Products";
    else if (type === "projects") sheetName = "Projects";
    else if (type === "internships") sheetName = "Internships";
    else if (type === "courses") sheetName = "Courses";
    else {
      return res.status(400).json({ error: "Invalid data type" });
    }

    const rawData = await getSheetData(`${sheetName}!A1:Z`);
    
    // Parse list fields if they are comma separated
    const parsedData = rawData.map(item => {
      const parsed = { ...item };
      const arrayFields = ['projectsUsingThis', 'relatedCourses', 'alsoBuy', 'tags', 'learnings', 'technologies', 'curriculum', 'roles', 'componentsUsed', 'relatedProjects', 'relatedProducts'];
      for (const field of arrayFields) {
        if (parsed[field]) {
          parsed[field] = (parsed[field] as string).split(',').map(s => s.trim()).filter(Boolean);
        } else {
          parsed[field] = [];
        }
      }
      
      // Parse boolean fields
      const booleanFields = ['isReadymade'];
      for (const field of booleanFields) {
        if (parsed[field] !== undefined) {
           if (typeof parsed[field] === 'string') {
             parsed[field] = parsed[field].trim().toUpperCase() === 'TRUE';
           } else {
             parsed[field] = Boolean(parsed[field]);
           }
        }
      }

      // Transform Google Drive links automatically to direct image links
      const imageFields = ['image'];
      for (const field of imageFields) {
        if (typeof parsed[field] === 'string' && parsed[field].includes('drive.google.com')) {
          const match = parsed[field].match(/\/d\/([a-zA-Z0-9_-]+)/) || parsed[field].match(/id=([a-zA-Z0-9_-]+)/);
          if (match && match[1]) {
             parsed[field] = `https://lh3.googleusercontent.com/d/${match[1]}=w1000`; // Better than uc?export=view for cross origin
          }
        }
      }

      return parsed;
    });

    res.json(parsedData);
  } catch (e: any) {
    console.error(`Error fetching ${req.params.type} from Sheets:`, e);
    res.status(500).json({ error: e.message });
  }
});

export default apiRouter;
