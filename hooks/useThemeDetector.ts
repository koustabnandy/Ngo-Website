"use client";

import { useState, useEffect } from 'react';

const useThemeDetector = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Initial check
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkTheme(isDark);

    // Create a mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkTheme(isDark);
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return isDarkTheme;
};

export default useThemeDetector;