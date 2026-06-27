"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useTranslations } from "next-intl";
import { sendInquiry } from "@/app/actions/sendInquiry";
import classes from "./ContactForm.module.css";

const initialState = { status: "idle", errors: {}, message: "" };

function SubmitButton({ labels }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={classes.submitBtn} disabled={pending}>
      {pending ? labels.submitting : labels.submit}
    </button>
  );
}

export default function ContactForm() {
  const t = useTranslations("contact");

  const interestedInOptions = [
    { value: "general", label: t("interestedIn.general") },
    { value: "booking", label: t("interestedIn.booking") },
    { value: "press",   label: t("interestedIn.press") },
    { value: "other",   label: t("interestedIn.other") },
  ];

  const referralSources = [
    { value: "personal-contact",   label: t("referralSources.personalContact") },
    { value: "facebook-instagram", label: t("referralSources.facebookInstagram") },
    { value: "travel-agency",      label: t("referralSources.travelAgency") },
    { value: "search-engine",      label: t("referralSources.searchEngine") },
    { value: "featured-article",   label: t("referralSources.featuredArticle") },
    { value: "other",              label: t("referralSources.other") },
  ];

  const [state, formAction] = useActionState(sendInquiry, initialState);
  const formRef    = useRef(null);
  const dropdownRef = useRef(null);
  const [sourceUrl, setSourceUrl]   = useState("");
  const [phone, setPhone]           = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [interestedIn, setInterestedIn] = useState("");
  const [referrals, setReferrals]   = useState([]);

  useEffect(() => { setSourceUrl(window.location.href); }, []);

  const toggleReferral = (value) => {
    setReferrals((curr) => curr.includes(value) ? curr.filter((v) => v !== value) : [...curr, value]);
  };

  useEffect(() => {
    if (state.status === "success" && formRef.current) {
      formRef.current.reset();
      setInterestedIn(""); setReferrals([]); setPhone("");
    }
  }, [state.status]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [dropdownOpen]);

  if (state.status === "success") {
    return (
      <div className={classes.successBox} role="status">
        <h2 className={classes.successTitle}>{t("successTitle")}</h2>
        <p className={classes.successText}>{state.message}</p>
      </div>
    );
  }

  const interestedInLabel = interestedInOptions.find((o) => o.value === interestedIn)?.label || "";

  return (
    <form ref={formRef} action={formAction} className={classes.form} noValidate>
      <input type="text" name="honey" tabIndex={-1} autoComplete="off" className={classes.honey} aria-hidden="true" />
      <input type="hidden" name="sourceUrl" value={sourceUrl} readOnly />

      <div className={classes.grid}>
        <div className={classes.field}>
          <input type="text" name="name" id="name" placeholder={t("namePlaceholder")} required autoComplete="name" maxLength={256} className={classes.input} aria-invalid={!!state.errors?.name} />
          <span className={classes.line} aria-hidden="true"><span className={classes.lineInner} /></span>
          {state.errors?.name && <span className={classes.error}>{state.errors.name}</span>}
        </div>

        <div className={classes.field}>
          <input type="email" name="email" id="email" placeholder={t("emailPlaceholder")} required autoComplete="email" maxLength={256} className={classes.input} aria-invalid={!!state.errors?.email} />
          <span className={classes.line} aria-hidden="true"><span className={classes.lineInner} /></span>
          {state.errors?.email && <span className={classes.error}>{state.errors.email}</span>}
        </div>

        <div className={`${classes.field} ${classes.fieldPhone}`} data-lenis-prevent>
          <PhoneInput defaultCountry="hr" value={phone} onChange={(value) => setPhone(value)} placeholder={t("phonePlaceholder")} inputProps={{ autoComplete: "tel", maxLength: 30 }} className={classes.phoneInput} />
          <input type="hidden" name="phone" value={phone} />
          <span className={classes.line} aria-hidden="true"><span className={classes.lineInner} /></span>
        </div>

        <div className={classes.field} ref={dropdownRef}>
          <button type="button" className={`${classes.input} ${classes.dropdownToggle}`} onClick={() => setDropdownOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={dropdownOpen}>
            <span className={interestedIn ? classes.dropdownValue : classes.dropdownPlaceholder}>
              {interestedInLabel || t("interestedInPlaceholder")}
            </span>
            <svg className={`${classes.dropdownIcon} ${dropdownOpen ? classes.dropdownIconOpen : ""}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m17.422 8.452 1.06 1.061-5.777 5.779a.995.995 0 0 1-1.413 0l-5.78-5.779 1.06-1.06 5.425 5.424z" fill="currentColor" />
            </svg>
          </button>
          <input type="hidden" name="interestedIn" value={interestedIn} />
          <span className={classes.line} aria-hidden="true"><span className={classes.lineInner} /></span>
          {dropdownOpen && (
            <ul className={classes.dropdownList} role="listbox">
              {interestedInOptions.map((opt) => (
                <li key={opt.value}>
                  <button type="button" className={`${classes.dropdownOption} ${opt.value === interestedIn ? classes.dropdownOptionActive : ""}`} onClick={() => { setInterestedIn(opt.value); setDropdownOpen(false); }} role="option" aria-selected={opt.value === interestedIn}>
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={`${classes.field} ${classes.fieldFull} ${classes.fieldTextarea}`}>
        <textarea name="message" id="message" placeholder={t("messagePlaceholder")} maxLength={5000} rows={6} required className={`${classes.input} ${classes.textarea}`} aria-invalid={!!state.errors?.message} />
        <span className={classes.line} aria-hidden="true"><span className={classes.lineInner} /></span>
        {state.errors?.message && <span className={classes.error}>{state.errors.message}</span>}
      </div>

      <div className={classes.referralBlock}>
        <p className={classes.referralLabel}>{t("referralLabel")}</p>
        <div className={classes.referralGrid}>
          {referralSources.map((opt) => {
            const checked = referrals.includes(opt.value);
            return (
              <label key={opt.value} className={classes.referralOpt}>
                <input type="checkbox" name="howDidYouHear" value={opt.value} checked={checked} onChange={() => toggleReferral(opt.value)} className={classes.referralCheckbox} />
                <span className={`${classes.referralBox} ${checked ? classes.referralBoxChecked : ""}`} aria-hidden="true">
                  <svg viewBox="0 0 448 512" className={classes.referralCheck}>
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" fill="currentColor" />
                  </svg>
                </span>
                <span className={classes.referralText}>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p className={classes.formError} role="alert">{state.message}</p>
      )}

      <SubmitButton labels={{ submit: t("submitLabel"), submitting: t("submitting") }} />

      <p className={classes.footnote}>
        {t("privacyNote")}{" "}<a href="/privacy-policy">{t("privacyLink")}</a>.
      </p>
    </form>
  );
}
