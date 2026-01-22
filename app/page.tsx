import AboutHomeSection from "./components/AboutHomeSection";
import AnnouncementBar from "./components/AnnouncementBar";
import CustomerReviews from "./components/CustomerReviews";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HomeContactSection from "./components/HomeContactSection";
import HowItWorks from "./components/HowItWorks";
import LiveOrdersCarousel from "./components/LiveOrdersCarousel";
import MenuSection from "./components/MenuItems";
import Navbar from "./components/Navbar";
import WelcomeSection from "./components/WelcomeSection";
import WhyChooseMittalCatering from "./components/WhyChooseMittalCatering";

export const metadata = {
  title:
    "Best Caterers in India | Top Event Caterers in Rajasthan, India - Mittal Catering",
  description:
    "Mittal Catering is one of India’s Top Event Caterers specializing in offering best event catering services for all occasions across Rajasthan, India.",
  keywords:
    "Best Caterers in India, Top Event Caterers in Rajasthan, Event Catering Services, Mittal Catering, Catering Services India, Wedding Catering Rajasthan, Corporate Event Catering, Party Catering Services, Catering Company India",
};

export default function Home() {
  return (
    <>
    <AnnouncementBar/>
    <Navbar/>
    <div className="bg-white text-black">
      <main>
        <HeroSection />
        <WelcomeSection />
        <MenuSection />
        <WhyChooseMittalCatering/>
        <AboutHomeSection/>
        <HowItWorks/>
        <HomeContactSection/>
        <LiveOrdersCarousel/>
        <FeaturesSection />
        <CustomerReviews/>
      </main>
    </div>
    <Footer/>
    </>
  );
}


