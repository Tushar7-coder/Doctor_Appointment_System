import { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // To cancel fetch on unmount
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal, // Attach abort signal
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || `Error: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        setData(result.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup: cancel request on unmount
  }, [url, localStorage.getItem("token")]); // 🔥 Added token dependency

  return { data, loading, error };
};

export default useFetchData;
