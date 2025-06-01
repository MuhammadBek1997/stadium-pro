import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(url);
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
