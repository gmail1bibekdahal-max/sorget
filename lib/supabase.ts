import { createBrowserClient } from "@supabase/ssr";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const url = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "").trim();
const key = rawKey.trim();

// Cookie-based browser client: the PKCE code verifier is stored in a cookie
// (not localStorage), so the server-side /auth/callback route handler can read
// it and complete the code exchange without needing browser APIs.
export const supabase = createBrowserClient(
  url || "https://placeholder.supabase.co",
  key || "placeholder-anon-key"
);