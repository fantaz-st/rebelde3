"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition, useState, useRef, useEffect } from "react";
import { routing } from "@/i18n/routing";
import classes from "./LanguageSwitcher.module.css";

const LABELS = {
  en: "EN",
  hr: "HR",
  de: "DE",
  es: "ES",
  it: "IT",
  fr: "FR",
};

export default function LanguageSwitcher({ isDarkUi = false }) {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname(); // locale-stripped path, e.g. "/the-boat" regardless of locale
  const [, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const switchLocale = (next) => {
    if (next === locale) { setOpen(false); return; }
    setOpen(false);
    // next-intl's router.replace handles prefix adding/removing automatically
    startTransition(() => router.replace(pathname, { locale: next }));
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const colorClass = isDarkUi ? classes.dark : classes.light;

  return (
    <div
      ref={wrapRef}
      className={`${classes.wrap} ${colorClass} ${open ? classes.wrapOpen : ""}`}
    >
      <button
        type="button"
        className={classes.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span className={classes.triggerLabel}>{LABELS[locale]}</span>
        <svg
          className={`${classes.chevron} ${open ? classes.chevronOpen : ""}`}
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden="true"
          width="10"
          height="6"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul className={classes.dropdown} role="listbox" aria-label="Language">
          {routing.locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                className={`${classes.option} ${l === locale ? classes.optionActive : ""}`}
                onClick={() => switchLocale(l)}
              >
                {LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
