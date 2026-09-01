import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee"; // Import this
import Hub from "@/components/Hub";
import Features from "@/components/Features";
import AttributerSection from "@/components/AttributerSections"; // Import this
import CustomerReview from "@/components/CustomerReview";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoMarquee /> 
      <Hub />
      <Features />
      <AttributerSection />
      <CustomerReview />
      <GetStarted />
      <Footer />
    </main>
  );
}