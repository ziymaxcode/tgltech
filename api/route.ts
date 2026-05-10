import express from "express";
import apiRouter from "./router.js";

const app = express();
app.use(express.json());

// Mount the router under /api
app.use("/api", apiRouter);

// Export for Vercel
export default app;
