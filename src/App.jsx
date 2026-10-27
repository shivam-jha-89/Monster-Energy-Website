import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import FuelSection from "./components/FuelSection";
import Navbar from "./components/Navbar";
import FlavorSection from "./components/FlavorSection";
import LifestyleSection from './components/LifestyleSection';
import PromotionsSection from './components/PromotionsSection';

function App() {
  return (
    <div className="bg-black min-h-screen">
      <LoadingScreen />
      <Navbar />
      <Hero />
      <FuelSection />
      <LifestyleSection />
      <FlavorSection />
      <PromotionsSection />
    </div>
  );
}

export default App;
