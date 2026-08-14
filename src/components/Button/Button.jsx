// primary, white, ghost,
"use client";

import Link from "next/link";
import classes from "./Button.module.css";

export default function Button({ children, href, onClick, variant = "primary", size = "lg", className = "", ...props }) {
  const cls = [classes.btn, classes[variant], classes[size], className].join(" ");

  const content = (
    <span className={classes.btnInner}>
      <span className={classes.btnTxtWrap}>
        <span className={[classes.btnTxt, classes.top].join(" ")}>{children}</span>
        <span className={[classes.btnTxt, classes.bot].join(" ")}>{children}</span>
      </span>
      <span className={classes.btnBg} />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
