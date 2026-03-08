// src/hooks/useCareServices.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";

/**
 * Custom hook to fetch care services from Supabase.
 * Provides services list, loading state, error state, and a refresh function.
 */
export const useCareServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services from Supabase
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("care_services")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching services:", error);
        setError(error.message || "Failed to fetch services");
        setServices([]);
      } else {
        setServices(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred");
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,     // array of services
    loading,      // boolean loading state
    error,        // error message if any
    refresh: fetchServices, // function to manually refresh services
  };
};
