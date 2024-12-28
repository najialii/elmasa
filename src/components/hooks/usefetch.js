import { useState, useEffect , useRef} from 'react';
/**
 * Custom Hook for Fetching Data with Cleanup
 * @param {string} url - The API endpoint to fetch data from.
 * @param {function} transformData - Optional function to process the fetched data.
 * @returns {object} - An object containing `data`, `loading`, and `error`.
 */
const useFetch = (url, transformData = (data) => data) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const curUrl = useRef(url)

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData = await response.json();
        if(curUrl.current) {
          curUrl.current === false
        }
        console.log("response",rawData);
        setData(rawData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching data:', err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
