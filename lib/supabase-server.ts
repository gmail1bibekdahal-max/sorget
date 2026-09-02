import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const url = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "").trim();
const key = rawKey.trim();

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    url || "https://placeholder.supabase.co",
    key || "placeholder-anon-key",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored when called from Server Components
          }
        },
      },
    }
  );
}