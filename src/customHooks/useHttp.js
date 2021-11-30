import { useState,useCallback } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest =useCallback( async (requestConfiguration, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfiguration.url, {
        method: requestConfiguration.method,
        headers: requestConfiguration.headers,
        body: JSON.stringify(requestConfiguration.body),
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  },[]);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
