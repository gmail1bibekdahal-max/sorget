"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/AuthLayout.module.css";
import { track, saveLead, setUserEmail } from "@/lib/track";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogle = async () => {
    track({
      event_name: "click_continue_with_google",
      event_type: "auth",
      target_text: "Continue with Google",
      properties: { page: "login", auth_provider: "google" },
    });

    saveLead({
      step_reached: "login_google",
      raw_data: { method: "google", source: "login_page" },
    });

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback?next=/signup/setup` : undefined,
        },
      });

      if (error) {
        console.warn("[Auth] Google OAuth note (enable in Supabase dashboard -> Auth -> Providers):", error.message);
        router.push("/signup/setup");
      }
    } catch {
      router.push("/signup/setup");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");
    setUserEmail(email);

    track({
      event_name: "click_sign_in_submit",
      event_type: "auth",
      target_text: "Sign In",
      properties: {
        page: "login",
        email: email,
        has_password: Boolean(password),
        password_length: password.length,
      },
    });

    saveLead({
      email,
      step_reached: "login_attempt",
      raw_data: { email, source: "login_page" },
    });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || "temp-password-123",
      });

      if (error) {
        // If login fails because user doesn't exist yet, try creating account seamlessly
        const { error: signUpErr } = await supabase.auth.signUp({
          email,
          password: password || "temp-password-123",
        });

        if (signUpErr && !signUpErr.message.includes("already registered")) {
          console.warn("[Auth] Login info:", error.message);
        }
      }

      router.push("/signup/setup");
    } catch {
      router.push("/signup/setup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formSide}>
        <div className={styles.formBox}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.png"
              alt="Sorget Logo"
              width={34}
              height={34}
              style={{ height: "34px", width: "auto", objectFit: "contain" }}
              priority
            />
            <span>Sorget</span>
          </Link>


          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.subheading}>
            Don&apos;t have an account? <Link href="/signup">Sign up free</Link>
          </p>

          <button className={styles.googleBtn} onClick={handleGoogle} type="button">
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.7 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            Continue with Google
          </button>

          <div className={styles.divider}>or</div>

          <form onSubmit={handleSignIn}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setUserEmail(e.target.value);
                }}
                className={styles.input}
                onBlur={(e) => {
                  if (e.target.value) setUserEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <Link
              href="#"
              className={styles.forgotLink}
              onClick={() => track({
                event_name: "click_forgot_password",
                event_type: "click",
                target_text: "Forgot password?",
                properties: { page: "login", email: email || undefined }
              })}
            >
              Forgot password?
            </Link>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>


      <div className={styles.reviewSide}>
        <div className={styles.reviewContent}>
          <div className={styles.quoteIcon}>&quot;</div>
          <p className={styles.reviewQuote}>
            Sorget gave us a clear view of the customer journey — from the first marketing touchpoint to signup and purchase. We quickly discovered which campaigns were driving real business results.
          </p>
          <div className={styles.metric}>
            <span className={styles.metricValue}>2.4x</span>
            <span className={styles.metricLabel}>Higher ROI from marketing spend</span>
          </div>
          <div className={styles.reviewAuthor}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah Mitchell" className={styles.reviewAvatar} />
            <div>
              <div className={styles.reviewerName}>Sarah Mitchell</div>
              <div className={styles.reviewerTitle}>Head of Growth, Sorget</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
