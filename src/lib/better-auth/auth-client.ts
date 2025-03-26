import { createBetterAuthClient } from "@vxrn/better-auth";
import { getHostUrl } from "~/utils/host";

export const { authClient, setAuthClientToken, useAuth } =
  createBetterAuthClient({
    clientId: "default",
    baseURL: `${getHostUrl()}/api/auth`,
  });
