import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsAdmin(false);
      } else {
        // Admin check: email-based
        setIsAdmin(user.email === "admin@cdns.com");
      }
    } catch (error) {
      console.error("Admin check error:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Not admin → redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
