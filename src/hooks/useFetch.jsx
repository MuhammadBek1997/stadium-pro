import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDg3ODQ2ODAsImlzcyI6IkZ1ZGJhbGxNYW5hZ2VtZW50LnV6IiwiYXVkIjoiRm9vdGJhbGxNYW5hZ2VtZW50Q2xpZW50In0.01rqyllTk0EVnTymtGWT54-tTCHLFLrOiim1Hhne2ss'
        }
      });

      console.log("Status:", response.status);
      if (!response.ok) throw new Error("API so'rovi muvaffaqiyatli emas");

      const result = await response.json();
      setData(result);

    } catch (err) {
      console.log("Xatolik:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
