import { createBetterAuthClient } from "@vxrn/better-auth";

export const { authClient, setAuthClientToken, useAuth } =
  createBetterAuthClient({
    clientId: "default",
    baseURL: `${process.env.VITE_WEB_HOST}/api/auth`,
  });
