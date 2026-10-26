"use client";

// I18nProvider + useI18n — dynamic language switching, browser-locale detection,
// localStorage persistence, and Intl-based date/number formatting (blueprint
// "Internationalization" steps 2-5, sized for a single-route workspace).

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  dictionaries,
  LOCALES,
  type Locale,
  type MessageKey,
} from "./dictionaries";

const STORAGE_KEY = "brain-locale";

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LOCALES as readonly string[]).includes(stored)) return stored as Locale;
  } catch {
    // localStorage can throw in privacy modes — fall through to navigator.
  }
  const nav = window.navigator.language?.toLowerCase() ?? "en";
  return nav.startsWith("zh") ? "zh" : "en";
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  fmtDate: (iso: string, withTime?: boolean) => string;
  fmtNumber: (n: number) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // Detected locale is applied asynchronously (microtask) to avoid a cascading
    // synchronous re-render inside the effect body (react-hooks/set-state-in-effect).
    const detected = detectLocale();
    if (detected !== "en") {
      queueMicrotask(() => setLocaleState(detected));
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // Persistence is best-effort; the in-memory locale still switches.
    }
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const dict = dictionaries[locale];
    const t = (key: MessageKey, vars?: Record<string, string | number>) => {
      let text = dict[key] ?? dictionaries.en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replaceAll(`{${k}}`, String(v));
        }
      }
      return text;
    };
    const tag = locale === "zh" ? "zh-CN" : "en-US";
    return {
      locale,
      setLocale,
      t,
      fmtDate: (iso, withTime = false) => {
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return iso;
        return withTime
          ? new Intl.DateTimeFormat(tag, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(d)
          : new Intl.DateTimeFormat(tag, { month: "short", day: "numeric" }).format(d);
      },
      fmtNumber: (n) => new Intl.NumberFormat(tag).format(n),
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
