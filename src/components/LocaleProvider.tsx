"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/types";

type Ctx = { locale: Locale; messages: Messages };

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext(): Ctx {
  const v = useContext(LocaleContext);
  if (!v) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return v;
}
