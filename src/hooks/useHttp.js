import { useState, useEffect } from 'react';

const useHttp = (fetchFunction, dependency, type) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    fetchFunction(dependency, type)
      .then((res) => {
        setList(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [dependency, type, fetchFunction]);

  return {
    list,
    loading,
    error,
  };
};

export default useHttp;
