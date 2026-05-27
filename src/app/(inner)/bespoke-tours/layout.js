import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function InnerLayout({ children }) {
  return (
    <>
      <Header variant="blue" />
      <main>{children}</main>
      <Footer/>
    </>
  );
}