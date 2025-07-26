// server/index.ts
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
// Removed: import { setupVite, serveStatic, log } from "./vite";
// These are for local development server and static file serving, not for Vercel serverless.

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom logging middleware for API requests
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      // Use console.log directly for Vercel serverless functions
      console.log(`${new Date().toLocaleTimeString()} [express] ${logLine}`);
    }
  });

  next();
});

// Register API routes on the Express app
// IMPORTANT: This assumes registerRoutes (in server/routes.ts)
// has been refactored to *only* add routes to the 'app' instance
// and *does not* create or return an http.Server.
registerRoutes(app);

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  // In a Vercel serverless function, you typically do not re-throw errors
  // as Vercel handles error logging and reporting.
  // throw err; // Removed: Avoid re-throwing in serverless context
});

// For Vercel deployment, you simply export the configured Express app.
// Vercel's infrastructure will then handle incoming requests and route them
// to this exported Express application instance.
export default app;
