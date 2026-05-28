"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { sendInquiry } from "@/app/actions/sendInquiry";
import { interestedInOptions, referralSources } from "@/settings/contactForm";
import classes from "./ContactForm.module.css";

const initialState = { status: "idle", errors: {}, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={classes.submitBtn} disabled={pending}>
      {pending ? "Sending..." : "Submit"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendInquiry, initialState);
  const formRef = useRef(null);
  const [sourceUrl, setSourceUrl] = useState("");

  useEffect(() => {
    setSourceUrl(window.location.href);
  }, []);

  // Phone state (E.164 format)
  const [phone, setPhone] = useState("");

  // Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [interestedIn, setInterestedIn] = useState("");
  const dropdownRef = useRef(null);

  // Multi-checkbox
  const [referrals, setReferrals] = useState([]);

  const toggleReferral = (value) => {
    setReferrals((curr) =>
      curr.includes(value) ? curr.filter((v) => v !== value) : [...curr, value]
    );
  };

  // Reset on success
  useEffect(() => {
    if (state.status === "success" && formRef.current) {
      formRef.current.reset();
      setInterestedIn("");
      setReferrals([]);
      setPhone("");
    }
  }, [state.status]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [dropdownOpen]);

  if (state.status === "success") {
    return (
      <div className={classes.successBox} role="status">
        <h2 className={classes.successTitle}>Thank you!</h2>
        <p className={classes.successText}>{state.message}</p>
      </div>
    );
  }

  const interestedInLabel =
    interestedInOptions.find((o) => o.value === interestedIn)?.label || "";

  return (
    <form ref={formRef} action={formAction} className={classes.form} noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="honey"
        tabIndex={-1}
        autoComplete="off"
        className={classes.honey}
        aria-hidden="true"
      />

      <input type="hidden" name="sourceUrl" value={sourceUrl} readOnly />

      <div className={classes.grid}>
        {/* Name */}
        <div className={classes.field}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name*"
            required
            autoComplete="name"
            maxLength={256}
            className={classes.input}
            aria-invalid={!!state.errors?.name}
          />
          <span className={classes.line} aria-hidden="true">
            <span className={classes.lineInner} />
          </span>
          {state.errors?.name && <span className={classes.error}>{state.errors.name}</span>}
        </div>

        {/* Email */}
        <div className={classes.field}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email*"
            required
            autoComplete="email"
            maxLength={256}
            className={classes.input}
            aria-invalid={!!state.errors?.email}
          />
          <span className={classes.line} aria-hidden="true">
            <span className={classes.lineInner} />
          </span>
          {state.errors?.email && <span className={classes.error}>{state.errors.email}</span>}
        </div>

        {/* Phone — international input with flag dropdown */}
        <div className={`${classes.field} ${classes.fieldPhone}`} data-lenis-prevent>
          <PhoneInput
            defaultCountry="hr"
            value={phone}
            onChange={(value) => setPhone(value)}
            placeholder="Phone number"
            inputProps={{
              autoComplete: "tel",
              maxLength: 30,
            }}
            className={classes.phoneInput}
          />
          {/* Hidden field so the value submits with the form */}
          <input type="hidden" name="phone" value={phone} />
          <span className={classes.line} aria-hidden="true">
            <span className={classes.lineInner} />
          </span>
        </div>

        {/* Interested in — custom dropdown */}
        <div className={classes.field} ref={dropdownRef}>
          <button
            type="button"
            className={`${classes.input} ${classes.dropdownToggle}`}
            onClick={() => setDropdownOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <span className={interestedIn ? classes.dropdownValue : classes.dropdownPlaceholder}>
              {interestedInLabel || "You're interested in..."}
            </span>
            <svg
              className={`${classes.dropdownIcon} ${dropdownOpen ? classes.dropdownIconOpen : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m17.422 8.452 1.06 1.061-5.777 5.779a.995.995 0 0 1-1.413 0l-5.78-5.779 1.06-1.06 5.425 5.424z"
                fill="currentColor"
              />
            </svg>
          </button>
          <input type="hidden" name="interestedIn" value={interestedIn} />
          <span className={classes.line} aria-hidden="true">
            <span className={classes.lineInner} />
          </span>

          {dropdownOpen && (
            <ul className={classes.dropdownList} role="listbox">
              {interestedInOptions.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    className={`${classes.dropdownOption} ${
                      opt.value === interestedIn ? classes.dropdownOptionActive : ""
                    }`}
                    onClick={() => {
                      setInterestedIn(opt.value);
                      setDropdownOpen(false);
                    }}
                    role="option"
                    aria-selected={opt.value === interestedIn}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Message */}
      <div className={`${classes.field} ${classes.fieldFull} ${classes.fieldTextarea}`}>
        <textarea
          name="message"
          id="message"
          placeholder={
            "Your message\nWhen you prefer to travel\nNumber of guests\nRegions you're curious about\nAny specific interests or themes"
          }
          maxLength={5000}
          rows={6}
          required
          className={`${classes.input} ${classes.textarea}`}
          aria-invalid={!!state.errors?.message}
        />
        <span className={classes.line} aria-hidden="true">
          <span className={classes.lineInner} />
        </span>
        {state.errors?.message && <span className={classes.error}>{state.errors.message}</span>}
      </div>

      {/* Referral */}
      <div className={classes.referralBlock}>
        <p className={classes.referralLabel}>How did you hear about us?</p>
        <div className={classes.referralGrid}>
          {referralSources.map((opt) => {
            const checked = referrals.includes(opt.value);
            return (
              <label key={opt.value} className={classes.referralOpt}>
                <input
                  type="checkbox"
                  name="howDidYouHear"
                  value={opt.value}
                  checked={checked}
                  onChange={() => toggleReferral(opt.value)}
                  className={classes.referralCheckbox}
                />
                <span
                  className={`${classes.referralBox} ${checked ? classes.referralBoxChecked : ""}`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 448 512" className={classes.referralCheck}>
                    <path
                      d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className={classes.referralText}>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p className={classes.formError} role="alert">
          {state.message}
        </p>
      )}

      <SubmitButton />

      <p className={classes.footnote}>
        For more details about how we use your information, view our{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>
    </form>
  );
}
