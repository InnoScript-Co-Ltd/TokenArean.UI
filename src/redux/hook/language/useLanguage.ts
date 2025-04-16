// useLanguage.ts
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "app_language";
type SupportedLanguage = "en" | "mm";

let currentLang: SupportedLanguage =
  (localStorage.getItem(STORAGE_KEY) as SupportedLanguage) || "mm";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setLang(newLang: SupportedLanguage) {
  currentLang = newLang;
  localStorage.setItem(STORAGE_KEY, newLang);
  listeners.forEach((cb) => cb());
}

function getLang() {
  return currentLang;
}

export function useLanguage() {
  const lang = useSyncExternalStore(subscribe, getLang);
  return {
    lang,
    changeLanguage: setLang,
  };
}
