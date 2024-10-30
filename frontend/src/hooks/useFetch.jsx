import { useEffect, useState } from "react";
import { url } from "../utils/path";
import axios from 'axios'

const useFetch = (uri) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios(`${url}${uri}`);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, error, loading };
};

export default useFetch;
