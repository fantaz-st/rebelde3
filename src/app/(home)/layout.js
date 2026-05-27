import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function HomeLayout({ children }) {
  return (
    <>
      <Header variant="white" />
      <main>{children}</main>
      <Footer />
    </>
  );
}