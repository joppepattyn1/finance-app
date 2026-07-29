import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nlgrcagtyjnasisdqnqv.supabase.co";
const supabaseKey = "sb_publishable_U6b9tDudVTCZGZLmoe-h6g_9KdtmK5m";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,          // Bewaart sessie lokaal
    autoRefreshToken: true,        // Verleng tokens automatisch
    detectSessionInUrl: true,      // Nodig voor Safari/iPhone
    storage: localStorage          // Forceer localStorage (iPhone fix)
  }
});

// iPhone fix: Safari verliest soms de sessie → forceer refresh
supabase.auth.onAuthStateChange(async (event, session) => {
  if (!session) {
    console.log("iPhone Safari verloor sessie → refreshen...");
    await supabase.auth.refreshSession();
  }
});
