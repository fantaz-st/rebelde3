import { pageMetadata } from "@/lib/schema";

import classes from "./page.module.css";
import Loader from "@/components/Loader/Loader";
import Hero from "@/sections/home/Hero/Hero";
import Gallery from "@/sections/home/Gallery/Gallery";
import Tours from "@/sections/home/Tours/Tours";
import Boat from "@/sections/home/Boat/Boat";
import Team from "@/sections/home/Team/Team";
import Testimonials from "@/sections/home/Testimonials/Testimonials";

export async function generateMetadata() {
  return pageMetadata({
    path: "",
    title: "Rebelde Boats — Private Boat Tours Split, Croatia | Island Hopping & Day Trips",
    description: "Private boat tours from Split, Croatia — Hvar, the Blue Cave, the Blue Lagoon and Vis, aboard a 12-guest Felix 37 speedboat.",
  });
}

export default function Home() {
  return (
    <>
      <div className={classes.bodyInner}>
        <div className={classes.mainInner}>
          <div className={classes.mainContent} data-home>
            <Loader />
            <Hero />
            <Gallery />
            <Tours />
            <Boat />
            <Team />
            <Testimonials />
          </div>
        </div>
      </div>
    </>
  );
}
