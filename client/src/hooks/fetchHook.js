import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export const useHttp = () => {
  // custom fetch-hook
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "There is an error");
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    []
  );

  return { loading, request };
};
