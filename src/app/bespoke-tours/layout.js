import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function InnerLayout({ children }) {
  return (
    <>
      <Header variant="blue" />
      <main>{children}</main>
    </>
  );
}