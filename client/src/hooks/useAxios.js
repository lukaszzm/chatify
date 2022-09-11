import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const useAxios = (params, immediate, dependencies) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies, immediate]);

  return [response, error, loading, fetchData];
};