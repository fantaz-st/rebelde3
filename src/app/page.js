import classes from "./page.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/sections/home/Hero/Hero";
import Gallery from "@/sections/home/Gallery/Gallery";
import Team from "@/sections/home/Team/Team";
import Tours from "@/sections/home/Tours/Tours";
import GridVisualizer from "@/components/GridVisualizer/GridVisualizer";

export default function Home() {
  return (
    <div className={classes.bodyInner}>
      <Header />
      <main className={classes.main}>
        <div className={classes.mainInner}>
          <div className={classes.mainContent}>
            <Hero />
            <Gallery />
            <Tours />
            <Team />
          </div>
          <Footer />
          {/* <GridVisualizer /> */}
        </div>
      </main>
    </div>
  );
}
