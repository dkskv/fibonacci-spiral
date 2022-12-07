import { useEffect, useState } from "react";

export function useElementRect(element: HTMLElement | null) {
  const [value, setValue] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (element) {
      const observer = new ResizeObserver((entries) => {
        const rect = entries[0]?.contentRect;

        if (rect) {
          setValue(rect);
        }
      });

      observer.observe(element);

      return () => observer.unobserve(element);
    }
  }, [element]);

  return value;
}
