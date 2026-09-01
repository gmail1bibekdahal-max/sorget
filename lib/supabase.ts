import { createClient } from "@supabase/supabase-js";

// Clean and normalize the Supabase URL and anon key
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const cleanUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "").trim();
const cleanKey = rawKey.trim();

export const supabase = createClient(
  cleanUrl || "https://placeholder.supabase.co",
  cleanKey || "placeholder-anon-key"
);

