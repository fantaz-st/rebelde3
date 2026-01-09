import classes from "./page.module.css";
import Header from "@/components/Header/Header";

import Footer from "@/components/Footer/Footer";
import HomeHero from "@/components/HomeHero/HomeHero";
import HomeGallery from "@/components/HomeGallery/HomeGallery";
import HomeTeam from "@/components/HomeTeam/HomeTeam";
import HomeMap from "@/components/HomeMap/HomeMap";

export default function Home() {
  return (
    <div className={classes.bodyInner}>
      <Header tone="dark" />
      <main className={classes.main}>
        <div className={classes.mainInner}>
          <div className={classes.mainContent}>
            <HomeHero />
            <HomeGallery />
            <HomeMap />
            <HomeTeam />
          </div>

          <Footer />

          <div className={classes.homeHeroCloneWrap}>{/* <HomeHeroClone /> */}</div>
        </div>
      </main>
    </div>
  );
}
