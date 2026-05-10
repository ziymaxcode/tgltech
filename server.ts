import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { getSheetData } from "./src/services/sheetsService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // API Routes will be mounted here
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Check Google Sheets config status
  app.get("/api/sheets/config-status", (req, res) => {
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
  app.get("/api/data/:type", async (req, res) => {
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
        return parsed;
      });

      res.json(parsedData);
    } catch (e: any) {
      console.error(`Error fetching ${req.params.type} from Sheets:`, e);
      res.status(500).json({ error: e.message });
    }
  });

  // Serve the frontend
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
