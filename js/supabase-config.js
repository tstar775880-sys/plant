/**
 * Plant Hub - Supabase Client Configuration
 * Safe for Frontend & GitHub Pages deployment (uses public anon key only).
 */

window.SUPABASE_URL = "https://yzuqgxnnkgslsionmoyf.supabase.co";
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6dXFneG5ua2dzbHNpb25tb3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMTgyNzcsImV4cCI6MjEwMjY5NDI3N30.HpoCBrVnNkqfsmVjft5WEmJcVGvR9y1HP4VawvDgHwc";

// Initialize Supabase Client if CDN is available
window.supabaseClient = null;
if (window.supabase && window.supabase.createClient) {
  try {
    window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    console.log("[Plant Hub] Supabase Cloud Database Connected Successfully!");
  } catch (e) {
    console.warn("[Plant Hub] Supabase Initialization Failed, fallback to LocalStorage", e);
  }
}
