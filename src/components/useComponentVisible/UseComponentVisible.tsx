import { useState, useEffect, useRef } from "react";

interface Props {
  initialIsVisible: boolean;
}

export default function useComponentVisible({ initialIsVisible }: Props) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as HTMLInputElement)
    ) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
