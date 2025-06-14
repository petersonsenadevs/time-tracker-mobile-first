
import Header from '@/components/Header';
import GlitchSlider from '@/components/GlitchSlider';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <GlitchSlider />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
