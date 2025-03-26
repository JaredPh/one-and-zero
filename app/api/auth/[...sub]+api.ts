import type { Endpoint } from "one";
import { auth } from "~/lib/better-auth/auth";

export const GET: Endpoint = async (req) => await auth.handler(req);

export const POST: Endpoint = async (req) => await auth.handler(req);
