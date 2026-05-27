import Header from "@/components/Header/Header";
import SmallFooter from "@/components/SmallFooter/SmallFooter";

export default function InnerLayout({ children }) {
  return (
    <>
      <Header variant="white" />
      <main>{children}</main>
      <SmallFooter/>
    </>
  );
}