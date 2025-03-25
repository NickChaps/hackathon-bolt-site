import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import PrizesSection from "../components/PrizesSection";
import SponsorsSection from "../components/SponsorsSection";
import JudgesSection from "../components/JudgesSection";
import RegisterSection from "../components/RegisterSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <PrizesSection />
        <SponsorsSection />
        <JudgesSection />
        <RegisterSection />
      </main>
      <Footer />
    </div>
  );
}
