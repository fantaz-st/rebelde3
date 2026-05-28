"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import classes from "./Faq.module.css";
import faqs from "@/settings/faqs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef(null);
  const gridRef = useRef(null);
  const tocRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRefs = useRef({});
  const count = faqs.length;

  // Pin the TOC column for the duration of the content column,
  // using ScrollTrigger (works through Lenis / overflow ancestors).
  useGSAP(
    () => {
      const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
      const scroller = scrollerEl || window;
      const scrollerOpt = scroller === window ? undefined : scroller;

      const toc = tocRef.current;
      const content = contentRef.current;
      if (!toc || !content) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 992px)", () => {
        const st = ScrollTrigger.create({
          trigger: content,
          scroller: scrollerOpt,
          start: "top 140",
          end: "bottom bottom",
          pin: toc,
          pinSpacing: false,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  // Scroll-spy: section is active when its top passes above viewport / 5
  useEffect(() => {
    const scrollerEl = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    const scroller = scrollerEl || window;

    let raf = null;

    const check = () => {
      raf = null;
      const triggerLine = window.innerHeight / 5;
      let current = 0;
      faqs.forEach((s, i) => {
        const el = sectionRefs.current[s.id];
        if (el && el.getBoundingClientRect().top <= triggerLine) current = i;
      });
      setActiveIndex(current);
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(check);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    check();

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const target = sectionRefs.current[id];
    if (!target) return;

    const scroller = window.__RBD_SCROLLER__ || document.querySelector(".scrollRoot");
    const offset = 140;

    if (scroller && scroller !== window) {
      const targetTop =
        target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop -
        offset;
      scroller.scrollTo({ top: targetTop, behavior: "smooth" });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className={classes.wrap} ref={wrapRef}>
      <div className={`container ${classes.head}`}>
        <h1 className={classes.title}>FAQ</h1>
        <p className={classes.subtitle}>
          Everything you might want to know before stepping aboard. Can&apos;t find your
          answer? Reach out and we&apos;ll help.
        </p>
      </div>

      <div className={`container grid ${classes.grid}`} ref={gridRef}>
        {/* LEFT: TOC (pinned by GSAP) */}
        <aside className={classes.toc} ref={tocRef}>
          <div className={classes.tocInner}>
            {/* Pin indicator column — slides via fr-grid trick */}
            <div className={classes.tocActive} style={{ "--count-item": count }}>
              <div
                className={classes.tocActiveInner}
                style={{
                  gridTemplateRows: `${activeIndex}fr 1fr ${count - activeIndex - 1}fr`,
                }}
              >
                <div className={classes.tocActiveEmpty} />
                <div className={classes.tocActiveMain}>
                  <span className={classes.tocActiveIc}>
                    <svg viewBox="0 0 25 24" fill="none" aria-hidden="true">
                      <path
                        d="M12.5 6a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5m0 6a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5m0-10.5a8.26 8.26 0 0 0-8.25 8.25c0 2.944 1.36 6.064 3.938 9.023a23.8 23.8 0 0 0 3.885 3.591.75.75 0 0 0 .861 0 23.8 23.8 0 0 0 3.879-3.59c2.573-2.96 3.937-6.08 3.937-9.024A8.26 8.26 0 0 0 12.5 1.5"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
                <div className={classes.tocActiveEmpty} />
              </div>
            </div>

            {/* The actual links */}
            <nav className={classes.tocList}>
              {faqs.map((section, i) => {
                const isActive = i === activeIndex;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleTocClick(e, section.id)}
                    className={`${classes.tocItem} ${isActive ? classes.tocItemActive : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className={classes.flip}>
                      <span className={classes.flipTop}>{section.title}</span>
                      <span className={classes.flipBottom}>{section.title}</span>
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* RIGHT: always-visible content */}
        <div className={classes.content} ref={contentRef}>
          {faqs.map((section) => (
            <div
              key={section.id}
              id={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className={classes.section}
            >
              <h2 className={classes.sectionTitle}>{section.title}</h2>

              <div className={classes.qaList}>
                {section.qa.map((item) => (
                  <div key={item.id} className={classes.qa}>
                    <h3 className={classes.question}>{item.question}</h3>
                    <p className={classes.answer}>{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
