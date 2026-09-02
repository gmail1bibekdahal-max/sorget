import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  // `next` lets callers pass a post-auth destination; defaults to onboarding
  const next = searchParams.get("next") ?? "/signup/setup";

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Redirect to the intended destination (absolute URL to avoid open-redirect)
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("[Auth] Code exchange error:", error.message);
  }

  // Something went wrong - send user to login with an error hint
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
