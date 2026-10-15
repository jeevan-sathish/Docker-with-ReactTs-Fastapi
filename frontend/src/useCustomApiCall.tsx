import { useState } from "react";

const useCustomApiCall = () => {
  const [data, setData] = useState<unknown[]>([]);
  const [error, setError] = useState("");

  async function callApi(endpoint: string) {
    try {
      setError("");

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${endpoint}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result: unknown = await response.json();
      setData(Array.isArray(result) ? result : [result]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
  }

  return { data, error, callApi };
};

export default useCustomApiCall;
