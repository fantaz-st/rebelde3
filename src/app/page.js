import classes from "./page.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/sections/home/Hero/Hero";
import Gallery from "@/sections/home/Gallery/Gallery";
import Map from "@/sections/home/Map/Map";
import HomeTeam from "@/components/HomeTeam/HomeTeam";
import Team from "@/sections/home/Team/Team";

export default function Home() {
  return (
    <div className={classes.bodyInner}>
      <Header />
      <main className={classes.main}>
        <div className={classes.mainInner}>
          <div className={classes.mainContent}>
            <Hero />
            <Gallery />
            <Map />
            {/* <Team /> */}
            <HomeTeam />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
