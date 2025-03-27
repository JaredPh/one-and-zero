import type { Endpoint } from "one";
import { auth } from "~/lib/better-auth/auth";

// Add CORS configuration to your auth handler
const corsConfig = {
  origin: [
    process.env.VITE_WEB_HOST,
    "http://localhost:8081",
    "https://*.ngrok-free.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const GET: Endpoint = async (req) => {
  const response = await auth.handler(req);
  // Add CORS headers to the response
  const newHeaders = new Headers(response.headers);
  newHeaders.set(
    "Access-Control-Allow-Origin",
    req.headers.get("origin") || ""
  );
  newHeaders.set("Access-Control-Allow-Credentials", "true");
  newHeaders.set("Access-Control-Allow-Methods", corsConfig.methods.join(","));
  newHeaders.set(
    "Access-Control-Allow-Headers",
    corsConfig.allowedHeaders.join(",")
  );
  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
};

export const POST: Endpoint = async (req) => {
  const response = await auth.handler(req);
  // Add CORS headers to the response
  const newHeaders = new Headers(response.headers);
  newHeaders.set(
    "Access-Control-Allow-Origin",
    req.headers.get("origin") || ""
  );
  newHeaders.set("Access-Control-Allow-Credentials", "true");
  newHeaders.set("Access-Control-Allow-Methods", corsConfig.methods.join(","));
  newHeaders.set(
    "Access-Control-Allow-Headers",
    corsConfig.allowedHeaders.join(",")
  );
  return new Response(response.body, {
    status: response.status,
    headers: newHeaders,
  });
};

// Add OPTIONS handler for preflight requests
export const OPTIONS: Endpoint = async (req) => {
  return {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": req.headers.origin || "",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": corsConfig.methods.join(","),
      "Access-Control-Allow-Headers": corsConfig.allowedHeaders.join(","),
    },
  };
};
