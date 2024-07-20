import { useEffect, useState } from "react";

export function usePromise<T>(promiseFn: () => Promise<T>, def?: T): [T, boolean] {
  const [data, setData] = useState<T>(def as T);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    promiseFn()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return [data, loading];
}