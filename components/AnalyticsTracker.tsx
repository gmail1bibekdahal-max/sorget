"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track, setUserEmail, saveLead } from "@/lib/track";
import { supabase } from "@/lib/supabase";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef<string>("");
  const lastClickTimeRef = useRef<number>(0);
  const lastClickTargetRef = useRef<string>("");

  // 1. Automatically sync authenticated user (e.g. Google OAuth login)
  useEffect(() => {
    const syncUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setUserEmail(user.email);
          saveLead({
            email: user.email,
            full_name: (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || undefined,
            step_reached: "authenticated",
          });
        }
      } catch {
        // ignore
      }
    };
    syncUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
        saveLead({
          email: session.user.email,
          full_name: (session.user.user_metadata?.full_name as string) || (session.user.user_metadata?.name as string) || undefined,
          step_reached: event === "SIGNED_IN" ? "signed_in" : "auth_update",
        });
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // 2. Clean Page View Tracking on route change
  useEffect(() => {
    const fullPath = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    if (fullPath && fullPath !== lastPathRef.current) {
      lastPathRef.current = fullPath;
      track({
        event_name: "page_view",
        event_type: "pageview",
        properties: {
          path: pathname,
          search: searchParams?.toString() || "",
          title: typeof document !== "undefined" ? document.title : "",
        },
      });
    }
  }, [pathname, searchParams]);


  // 2. Global Click Auto-Tracker (Cleaned & Deduplicated)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        if (!target) return;

        // Find closest button or anchor
        const buttonOrLink = target.closest("button, a") as HTMLElement | null;
        if (!buttonOrLink) return;

        // Extract button/link text
        const text = (
          buttonOrLink.getAttribute("data-track-text") ||
          buttonOrLink.getAttribute("aria-label") ||
          buttonOrLink.innerText ||
          ""
        ).replace(/\s+/g, " ").trim();

        if (!text && !buttonOrLink.id) return;

        // Deduplicate rapid duplicate clicks (within 400ms on same button)
        const now = Date.now();
        const clickKey = `${buttonOrLink.tagName}_${text}`;
        if (now - lastClickTimeRef.current < 400 && lastClickTargetRef.current === clickKey) {
          return;
        }
        lastClickTimeRef.current = now;
        lastClickTargetRef.current = clickKey;

        // Generate clean event name from text
        const customName = buttonOrLink.getAttribute("data-track-name");
        const cleanText = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "")
          .slice(0, 40);

        const event_name =
          customName ||
          (cleanText ? `click_${cleanText}` : `click_${buttonOrLink.tagName.toLowerCase()}`);

        const href = buttonOrLink.getAttribute("href") || undefined;

        track({
          event_name,
          event_type: "click",
          target_tag: buttonOrLink.tagName,
          target_text: text || undefined,
          target_href: href,
          target_id: buttonOrLink.id || undefined,
        });
      } catch (err) {
        console.warn("[Analytics] Click tracker notice:", err);
      }
    };

    // Auto-detect email when user enters it in any email input
    const handleBlur = (e: FocusEvent) => {
      try {
        const target = e.target as HTMLInputElement;
        if (target && target.tagName === "INPUT" && target.type === "email" && target.value) {
          setUserEmail(target.value);
        }
      } catch {
        // ignore
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("blur", handleBlur, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("blur", handleBlur, { capture: true });
    };
  }, []);

  return null;
}

