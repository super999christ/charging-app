import { useState } from "react";

export default function useCachedForm(key: string, obj: any) {
  const [sessionStorage, setSessionStorage, clearSessionStorage] =
    useSessionStorage(key);

  const [form, setForm] = useState(sessionStorage() || obj);

  function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;

    const newState = { ...form, [name]: value };
    setForm(newState);
    setSessionStorage(newState);
  }

  return [form, handleChange, clearSessionStorage];
}

export function useSessionStorage(
  key: string
): [() => any, (item: Object) => void, () => void] {
  const getSessionStorage = () => {
    const local = sessionStorage.getItem(key);
    if (local !== null && local !== undefined) {
      return JSON.parse(local);
    }

    return null;
  };

  const setSessionStorage = (item: Object) =>
    sessionStorage.setItem(key, JSON.stringify(item));

  const clearSessionStorage = () => sessionStorage.removeItem(key);

  return [getSessionStorage, setSessionStorage, clearSessionStorage];
}
