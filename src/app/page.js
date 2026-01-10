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

            <section className={classes.dummyDark}>
              <h2>Dummy Section 1</h2>
            </section>

            <section className={classes.dummyLight}>
              <h2>Dummy Section 2</h2>
            </section>

            <section className={classes.dummyDark}>
              <h2>Dummy Section 3</h2>
            </section>
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}
