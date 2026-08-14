import Link from "next/link";
import classes from "./AnimatedLink.module.css";

const AnimatedLink = ({ href, children }) => (
  <Link href={href} className={classes.menuLink}>
    <span className={classes.flip}>
      <span className={classes.flipTop}>{children}</span>
      <span className={classes.flipBottom}>{children}</span>
    </span>
  </Link>
);

export default AnimatedLink;
