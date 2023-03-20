import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    setData([]);
    setIsLoading(true);
    setError(null);
    const fetchData = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        setError(`Something went wrong: ${response.statusText} `);
        setIsLoading(false);
        throw Error(`Something went wrong: ${response.statusText} `);
      } else {
        if (!ignore) {
          const data = await response.json();
          setData(data);
          setIsLoading(false);
          setError(null);
        }
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);
  return { data, isLoading, error };
};
