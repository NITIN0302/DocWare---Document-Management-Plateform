import { useState, useEffect } from "react";

const useFetch = (url, method = "GET", body = null, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        ...headers,
                    },
                };

                if (body && (method === "POST" || method === "PUT")) {
                    options.body = JSON.stringify(body);
                }

                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, body]);

    return { data, loading, error };
};

export default useFetch;