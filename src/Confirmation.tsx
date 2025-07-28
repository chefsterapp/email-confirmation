import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anonymous key are required. Please check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Confirmation() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
  }, [location]);

  return (
    <div>
      <h1>Confirming your email...</h1>
      <p>You can now close this tab and return to the app.</p>
    </div>
  );
}

export default Confirmation;