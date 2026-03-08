// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iotinuyzyoyufwzlzyux.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvdGludXl6eW95dWZ3emx6eXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTM4OTgsImV4cCI6MjA4NDQ2OTg5OH0.GopEmI8HtGJGTNiKpfleCZ2QkXHYe-4fkPPsPiKds54"; // replace with your actual anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
