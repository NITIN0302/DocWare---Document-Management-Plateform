import { useState, useEffect } from "react";

const useFetchData = (url, type, body) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        method: type,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      setData(response);
    };

    fetchData();
  }, [url]);

  return { data };
};

export default useFetchData;
