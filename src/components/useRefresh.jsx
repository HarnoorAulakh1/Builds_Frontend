import { useEffect } from 'react';

export default function useRefresh(navigate, path) {
  let handler;

  const refresh = () => {
    navigate("");

    handler = setTimeout(() => navigate(path), 10);
  };

  useEffect(() => {
    return () => handler && clearTimeout(handler);
  }, [handler]);

  return refresh;
}