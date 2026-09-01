import { supabase } from "./supabase";

export interface EventPayload {
  event_name: string;
  event_type?: "click" | "pageview" | "input" | "submit" | "auth" | "lead_update";
  target_tag?: string;
  target_text?: string;
  target_href?: string;
  target_id?: string;
  properties?: Record<string, unknown>;
}

export interface LeadPayload {
  full_name?: string;
  email?: string;
  company?: string;
  website?: string;
  cms?: string;
  form_tool?: string;
  crm?: string;
  plan?: string;
  step_reached?: string;
  raw_data?: Record<string, unknown>;
}

/**
 * Generate a random UUID safely in any browser environment
 */
function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get or create a persistent Visitor ID across browser sessions
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "server-side";
  try {
    let visitorId = localStorage.getItem("sorget_visitor_id");
    if (!visitorId) {
      visitorId = "vis_" + generateUUID();
      localStorage.setItem("sorget_visitor_id", visitorId);
    }
    return visitorId;
  } catch {
    return "anonymous";
  }
}

/**
 * Get or create a Session ID for the current browser tab session
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return "server-side";
  try {
    let sessionId = sessionStorage.getItem("sorget_session_id");
    if (!sessionId) {
      sessionId = "sess_" + generateUUID();
      sessionStorage.setItem("sorget_session_id", sessionId);
    }
    return sessionId;
  } catch {
    return "session-fallback";
  }
}

/**
 * Get the stored user email if identified
 */
export function getUserEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("sorget_user_email") || null;
  } catch {
    return null;
  }
}

/**
 * Remember the user email when they type or submit it
 */
export function setUserEmail(email: string) {
  if (typeof window === "undefined" || !email) return;
  try {
    localStorage.setItem("sorget_user_email", email.trim().toLowerCase());
  } catch {
    // ignore
  }
}

/**
 * Track any user event to Supabase
 */
export async function track(
  eventNameOrPayload: string | EventPayload,
  properties?: Record<string, unknown>
) {
  try {
    const payload: EventPayload =
      typeof eventNameOrPayload === "string"
        ? {
            event_name: eventNameOrPayload,
            event_type: "click",
            properties: properties ?? {},
          }
        : {
            ...eventNameOrPayload,
            properties: {
              ...(eventNameOrPayload.properties ?? {}),
              ...(properties ?? {}),
            },
          };

    const visitor_id = getVisitorId();
    const session_id = getSessionId();
    const user_email = getUserEmail() || (payload.properties?.email as string) || null;

    const row = {
      event: payload.event_name,      // Backward compatibility for old table column
      page: typeof window !== "undefined" ? window.location.pathname : null, // Backward compatibility
      event_name: payload.event_name,
      event_type: payload.event_type || "click",
      target_tag: payload.target_tag || null,
      target_text: payload.target_text ? payload.target_text.slice(0, 500) : null,
      target_href: payload.target_href || null,
      target_id: payload.target_id || null,
      properties: payload.properties || {},
      visitor_id,
      session_id,
      user_email,
      page_path: typeof window !== "undefined" ? window.location.pathname : null,
      page_url: typeof window !== "undefined" ? window.location.href : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      created_at: new Date().toISOString(),
    };

    // Asynchronously insert into Supabase
    const { error } = await supabase.from("events").insert(row);
    if (error) {
      console.warn("[Analytics] Event tracking notice:", error.message);
    }
  } catch (err) {
    console.warn("[Analytics] Track execution error:", err);
  }
}

/**
 * Save lead or form submission data to Supabase (Unified 1 row per user/session)
 */
export async function saveLead(data: LeadPayload) {
  try {
    const visitor_id = getVisitorId();
    const session_id = getSessionId();

    if (data.email) {
      setUserEmail(data.email);
    }

    // Accumulate lead data in sessionStorage across multi-step onboarding
    let cachedLead: Record<string, unknown> = {};
    if (typeof window !== "undefined") {
      try {
        const existing = sessionStorage.getItem("sorget_lead_data");
        if (existing) cachedLead = JSON.parse(existing);
      } catch {
        // ignore
      }
    }

    const mergedLead = {
      ...cachedLead,
      ...data,
      email: data.email || (cachedLead.email as string) || getUserEmail() || null,
      full_name: data.full_name || (cachedLead.full_name as string) || null,
      company: data.company || (cachedLead.company as string) || null,
      website: data.website || (cachedLead.website as string) || null,
      cms: data.cms || (cachedLead.cms as string) || null,
      form_tool: data.form_tool || (cachedLead.form_tool as string) || null,
      crm: data.crm || (cachedLead.crm as string) || null,
      plan: data.plan || (cachedLead.plan as string) || null,
      step_reached: data.step_reached || (cachedLead.step_reached as string) || null,
    };

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("sorget_lead_data", JSON.stringify(mergedLead));
      } catch {
        // ignore
      }
    }

    // Check if a lead row already exists for this session
    const { data: existingRows } = await supabase
      .from("leads")
      .select("id")
      .eq("session_id", session_id)
      .limit(1);

    const payload = {
      visitor_id,
      session_id,
      full_name: mergedLead.full_name,
      email: mergedLead.email,
      company: mergedLead.company,
      website: mergedLead.website,
      cms: mergedLead.cms,
      form_tool: mergedLead.form_tool,
      crm: mergedLead.crm,
      plan: mergedLead.plan,
      step_reached: mergedLead.step_reached,
      raw_data: mergedLead,
      updated_at: new Date().toISOString(),
    };

    if (existingRows && existingRows.length > 0) {
      // Update the existing row for this user session
      const { error } = await supabase
        .from("leads")
        .update(payload)
        .eq("session_id", session_id);
      if (error) console.warn("[Analytics] Update lead notice:", error.message);
    } else {
      // Insert new lead row
      const { error } = await supabase.from("leads").insert({
        ...payload,
        created_at: new Date().toISOString(),
      });
      if (error) console.warn("[Analytics] Insert lead notice:", error.message);
    }
  } catch (err) {
    console.warn("[Analytics] Save lead error:", err);
  }
}


