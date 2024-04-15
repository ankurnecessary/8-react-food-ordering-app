import {useEffect, useState, useCallback} from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || 'Something went wrong. Please try again later');
  }

  return responseData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async data => {
    setIsLoading(true);
    try {
      const responseData = await sendHttpRequest(url, {...config, body: data});
      setData(responseData);
    } catch (error) {
      setError(error.message || 'Something went wrong.');
    }

    setIsLoading(false);
  }, [url, config]);

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
  };
}
