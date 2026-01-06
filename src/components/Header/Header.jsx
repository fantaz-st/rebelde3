"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import classes from "./Header.module.css";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import pageLinks from "../settings/pageLinks";

export default function Header({ tone = "dark", scrollThreshold = 10 }) {
  const lastYRef = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;

      raf = window.requestAnimationFrame(() => {
        raf = 0;

        const y = window.scrollY || 0;

        const nextIsScrolled = y > scrollThreshold;
        setIsScrolled((prev) => (prev === nextIsScrolled ? prev : nextIsScrolled));

        if (navOpen || y <= scrollThreshold) {
          setIsHidden((prev) => (prev === false ? prev : false));
          lastYRef.current = y;
          return;
        }

        const delta = y - lastYRef.current;

        if (Math.abs(delta) < 8) {
          lastYRef.current = y;
          return;
        }

        const nextIsHidden = delta > 0;
        setIsHidden((prev) => (prev === nextIsHidden ? prev : nextIsHidden));
        lastYRef.current = y;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [navOpen, scrollThreshold]);

  useEffect(() => {
    if (!navOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [navOpen]);

  const headerClassName = [classes.header, tone === "light" ? classes.onLight : classes.onDark, isScrolled && classes.onScroll, navOpen && classes.onOpenNav, isHidden && classes.isHidden].filter(Boolean).join(" ");

  return (
    <header className={headerClassName}>
      <div className={classes.overlay} aria-hidden="true" />
      <div className={classes.inner}>
        <div className={classes.wrap}>
          <div className={classes.grid}>
            <Link href="/" className={classes.logo} aria-label="Home">
              <Logo />
            </Link>

            <nav className={classes.menu} aria-label="Primary">
              <ul className={classes.menuList}>
                {pageLinks.map((item) => (
                  <li key={item.label} className={classes.menuItem}>
                    <Link href={item.href} className={classes.menuLink}>
                      <span className={classes.flip}>
                        <span className={classes.flipTop}>{item.label}</span>
                        <span className={classes.flipBottom}>{item.label}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Button href="/contact" variant="white" size="sm">
              GET IN TOUCH
            </Button>

            <button type="button" aria-label="Toggle menu" aria-expanded={navOpen} aria-controls="mobile-nav" className={`${classes.ham} ${navOpen ? classes.active : ""}`} onClick={() => setNavOpen((v) => !v)}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div className={`${classes.mobile} ${navOpen ? classes.mobileOpen : ""}`} id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu">
        <div className={classes.mobileInner}>
          <ul className={classes.mobileList}>
            {pageLinks.map((item) => (
              <li key={item.label} className={classes.mobileItem}>
                <Link href={item.href} className={classes.mobileLink} onClick={() => setNavOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className={classes.mobileCta} onClick={() => setNavOpen(false)}>
            GET IN TOUCH
          </Link>
        </div>
      </div>

      <button type="button" className={`${classes.backdrop} ${navOpen ? classes.backdropOpen : ""}`} aria-label="Close menu" onClick={() => setNavOpen(false)} />
    </header>
  );
}
