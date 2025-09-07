"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "../contexts/LoadingContext";

export const useRouteLoading = () => {
  const { startLoading, stopLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    // Start loading when component mounts (route change initiated)
    startLoading();

    // Stop loading after a short delay to allow content to load
    const timer = setTimeout(() => {
      stopLoading();
    }, 1000);

    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  // Custom navigation function with loading
  const navigateWithLoading = (href: string) => {
    startLoading();
    router.push(href);
  };

  return { navigateWithLoading };
};
