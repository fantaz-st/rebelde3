import { createClient } from "@supabase/supabase-js";
import { createBrowserClient as supabaseCreateBrowserClient } from "@supabase/ssr";

// Public client — safe for both server and client
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Server-only admin client — call this function only in server components/API routes
export function getSupabaseAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Browser client for auth in client components

export function createBrowserClient() {
  return supabaseCreateBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
