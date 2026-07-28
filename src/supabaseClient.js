import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nlgrcagtyjnasisdqnqv.supabase.co";
const supabaseKey = "sb_publishable_U6b9tDudVTCZGZLmoe-h6g_9KdtmK5m";

export const supabase = createClient(supabaseUrl, supabaseKey);
