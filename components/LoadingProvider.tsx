"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure minimum loading time for animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-600"}>
        {children}
      </div>
    </>
  );
}
