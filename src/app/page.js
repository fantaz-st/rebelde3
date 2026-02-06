import classes from "./page.module.css";
import Hero from "@/sections/home/Hero/Hero";
import Gallery from "@/sections/home/Gallery/Gallery";
import Team from "@/sections/home/Team/Team";
import Tours from "@/sections/home/Tours/Tours";
import Testimonials from "@/sections/home/Testimonials/Testimonials";
import Loader from "@/components/Loader/Loader";
import Boat from "@/sections/home/Boat/Boat";
// import GridVisualizer from "@/components/GridVisualizer/GridVisualizer";

export default function Home() {
  return (
    <div className={classes.bodyInner}>
      <main className={classes.main}>
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
          {/* <GridVisualizer /> */}
        </div>
      </main>
    </div>
  );
}
