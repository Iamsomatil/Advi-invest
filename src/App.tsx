import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import PlatformOverview from './components/PlatformOverview';
import Traction from './components/Traction';
import MarketBusiness from './components/MarketBusiness';
import Testimonials from './components/Testimonials';
import InvestorForm from './components/InvestorForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <PlatformOverview />
      <Traction />
      <MarketBusiness />
      <Testimonials />
      <InvestorForm />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
