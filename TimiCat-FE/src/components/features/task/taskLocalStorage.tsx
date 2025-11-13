import { useState, useEffect, useCallback } from "react";

// 改良一言存储
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (err) {
      console.error("useLocalStorage read error:", err);
      return initialValue;
    }
  });

  // 创建一个包装的 setState，立即同步更新 localStorage
  const setStateAndSync = useCallback(
    (value: React.SetStateAction<T>) => {
      setState((prevState) => {
        const nextState =
          typeof value === "function"
            ? (value as (prev: T) => T)(prevState)
            : value;

        try {
          localStorage.setItem(key, JSON.stringify(nextState));
        } catch (err) {
          console.error("useLocalStorage write error:", err);
        }

        return nextState;
      });
    },
    [key]
  );

  // 保留原本的 useEffect 机制作为备选防御机制（虽然不确定会不会生效）
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error("useLocalStorage write error:", err);
    }
  }, [key, state]);

  return [state, setStateAndSync];
}
