import { useEffect, useState } from "react";

const options = {
  method: "GET",
};

export const useFetch = (fetchFn, category) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const data = await fetchFn(category, options);
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "failed to fetch data" });
      }
      setIsFetching(false);
    };

    fetchData();
  }, [fetchFn, category]);

  return {
    isFetching,
    error,
    fetchedData,
  };
};
