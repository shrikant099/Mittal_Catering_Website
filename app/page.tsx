import AboutHomeSection from "./components/AboutHomeSection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuItems";
import WelcomeSection from "./components/WelcomeSection";

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
    <div className="bg-white text-black">
      <main>
        <HeroSection />
        <WelcomeSection />
        <MenuSection />
        <AboutHomeSection/>
        <FeaturesSection />
      </main>
    </div>
  );
}
