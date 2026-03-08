import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user || null;
      setUser(user);
      
      // Check if admin
      if (user) {
        checkAdminStatus(user);
      }
      setLoading(false);
    });

    // Listen to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user || null;
        setUser(user);
        
        // Check admin status on login
        if (user) {
          checkAdminStatus(user);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Cleanup
    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  // Check if user is admin (email-based)
  const checkAdminStatus = async (user) => {
    if (user.email === "admin@cdns.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
