import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function BookLayout({ children }) {
  return (
    <>
      <Header variant="white" />
      {children}
      <Footer />
    </>
  )
}
