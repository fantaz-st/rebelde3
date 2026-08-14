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
    description: "Book a private boat tour from Split, Croatia. Explore Hvar, Blue Cave, Blue Lagoon, Vis & more on a luxury Felix 37 speedboat. Up to 12 guests, fully personalised.",
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
