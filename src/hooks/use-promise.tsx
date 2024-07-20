import { useEffect, useState } from "react";

export function usePromise<T>(promise: Promise<T>, def?: T): [T, boolean] {
  const [data, setData] = useState<T>(def as T);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    promise
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [promise]);
  return [data, loading];
}