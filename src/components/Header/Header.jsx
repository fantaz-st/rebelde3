"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useTranslations } from "next-intl";
import classes from "./Header.module.css";
import AnimatedLink from "../AnimatedLink/AnimatedLink";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

export default function Header({ variant = "white" }) {
  const t = useTranslations("nav");
  const SHADOW_THRESHOLD = 300;

  const pageLinks = [
    { href: "/",               label: t("home") },
    { href: "/the-boat",      label: t("theBoat") },
    { href: "/bespoke-tours", label: t("tours") },
    { href: "/faq",           label: t("faq") },
    { href: "/contact",       label: t("contact") },
  ];

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isShadowVisible, setIsShadowVisible] = useState(false);
  const [isMenuOpen,      setIsMenuOpen]      = useState(false);
  const [isMenuActive,    setIsMenuActive]    = useState(false);

  const prevScrollYRef = useRef(0);
  const overlayRef     = useRef(null);
  const panelRef       = useRef(null);
  const listRef        = useRef(null);
  const menuTlRef      = useRef(null);

  useEffect(() => {
    const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    const scroller   = scrollerEl || window;
    const getY = () => (scroller === window ? window.scrollY || 0 : scroller.scrollTop || 0);

    prevScrollYRef.current = getY();

    const updateOnScroll = () => {
      const y = getY();
      if (y <= 0) setIsHeaderVisible(true);
      else        setIsHeaderVisible(y < prevScrollYRef.current);
      setIsShadowVisible(y > SHADOW_THRESHOLD);
      prevScrollYRef.current = y;
    };

    updateOnScroll();
    scroller.addEventListener("scroll", updateOnScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", updateOnScroll);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1");

    if (!overlayRef.current || !panelRef.current || !listRef.current) return;

    menuTlRef.current = gsap
      .timeline({ paused: true })
      .to(overlayRef.current, { opacity: 0.45, duration: 0.3, ease: "power2.out" })
      .to(panelRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "hop" }, "-=0.1")
      .from(Array.from(listRef.current.children), { y: 24, opacity: 0, stagger: 0.07, duration: 0.35, ease: "power2.out" }, "-=0.1");

    menuTlRef.current.eventCallback("onComplete", () => setIsMenuActive(true));
    menuTlRef.current.eventCallback("onReverseComplete", () => setIsMenuActive(false));
  }, []);

  useEffect(() => {
    if (!menuTlRef.current) return;
    isMenuOpen ? menuTlRef.current.play() : menuTlRef.current.reverse();
  }, [isMenuOpen]);

  const isDarkUi = isMenuOpen || isMenuActive || (variant === "blue" && !isShadowVisible);

  const headerClassName = [
    classes.header,
    isHeaderVisible ? classes.visible : classes.hidden,
    isMenuActive && classes.menuActive,
    isShadowVisible && classes.scrolled,
  ].filter(Boolean).join(" ");

  return (
    <>
      <header className={headerClassName} data-header>
        <div className={classes.shadow} aria-hidden="true" />

        <div className={classes.container}>
          {/* Logo */}
          <div className={classes.logo}>
            <Link href="/" aria-label="Rebelde Boats home">
              <Logo variant={isDarkUi ? "blue" : "white"} />
            </Link>
          </div>

          {/* Desktop nav links */}
          <nav className={`${classes.nav} ${classes[isDarkUi ? "dark" : "light"]}`}>
            {pageLinks.map(({ href, label }) => (
              <div key={href} className={classes.navItem}>
                <AnimatedLink href={href}>{label.toUpperCase()}</AnimatedLink>
              </div>
            ))}
          </nav>

          {/* Right side — desktop: lang dropdown + contact button */}
          <div className={classes.actions}>
            {/* Language dropdown — visible on ALL breakpoints */}
            <LanguageSwitcher isDarkUi={isDarkUi} />

            {/* Contact button — hidden on tablet/mobile via wrapper div */}
            <div className={classes.contactBtnWrap}>
              <Button
                href="/contact"
                variant={isDarkUi ? "blue" : "white"}
                size="sm"
              >
                {t("getInTouch")}
              </Button>
            </div>

            {/* Hamburger — mobile only, inside actions so it never overlaps the dropdown */}
            <button
              className={[classes.hamburgerBtn, classes[isDarkUi ? "dark" : "light"]].join(" ")}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className={[classes.hamburger, isMenuOpen && classes.open].filter(Boolean).join(" ")}>
                <span /><span /><span />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        ref={overlayRef}
        className={`${classes.overlay} ${isMenuOpen ? classes.overlayOpen : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Full-screen menu panel */}
      <div ref={panelRef} className={`${classes.menu} ${isMenuOpen ? classes.menuOpen : ""}`}>
        <nav>
          <ul ref={listRef} className={classes.navList}>
            {pageLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={() => setIsMenuOpen(false)}>
                  <h2>{label}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language switcher inside the mobile menu panel */}
        <div className={classes.menuFooter}>
          <LanguageSwitcher isDarkUi={true} />
        </div>
      </div>
    </>
  );
}
