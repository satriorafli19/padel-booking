import { createClient } from '@supabase/supabase-js';

// Pakai URL Proyek MainPadel kamu yang ini
const SUPABASE_URL = "https://tipojodmvokyvzrobquh.supabase.co"; 

// Tempelkan (Paste) kunci Publishable yang barusan kamu copy dari dashboard
const SUPABASE_ANON_KEY = "sb_publishable__HWsvr3Ak-SLgmHaEDJl0w_eVe8zsSB"; // <-- Paste yang lengkap di sini ya!

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);