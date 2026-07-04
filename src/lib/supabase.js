// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Public client — uses anon key, respects RLS

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Service client — bypasses RLS, server-side only (webhook, admin)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
