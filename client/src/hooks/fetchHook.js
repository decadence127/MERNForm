import { useState, useCallback } from "react";

export const useHttp = () => {
  // custom fetch-hook
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      }
    ) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        await new Promise((resolve, reject) =>
          setTimeout(() => {
            resolve("ok");
          }, 500)
        );
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
