
import { useState } from "react";

export function useLocalStorage() {
  const getItem = <T>(key: string, defaultValue?: T): T | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting localStorage item ${key}:`, error);
      return defaultValue;
    }
  };

  const setItem = <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage item ${key}:`, error);
    }
  };

  const removeItem = (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item ${key}:`, error);
    }
  };

  return { getItem, setItem, removeItem };
}
