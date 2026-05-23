import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim();
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)?.trim();

const INVALID_ENV_VALUES = new Set([
  '',
  'undefined',
  'null',
  'your_supabase_url',
  'your_supabase_anon_key',
  'your_supabase_publishable_key',
]);

const isValidEnv = (value?: string) => Boolean(value) && !INVALID_ENV_VALUES.has(value!.toLowerCase());

const hasValidSupabaseEnv = isValidEnv(SUPABASE_URL) && isValidEnv(SUPABASE_ANON_KEY);

export const getSupabaseClient = () => {
  if (!hasValidSupabaseEnv) {
    return null;
  }

  return createClient<Database>(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

export const supabaseEnvStatus = {
  configured: hasValidSupabaseEnv,
  missingUrl: !isValidEnv(SUPABASE_URL),
  missingAnonKey: !isValidEnv(SUPABASE_ANON_KEY),
};
