
import Header from '@/components/Header';
import GlitchSlider from '@/components/GlitchSlider';
import AppGallerySection from '@/components/AppGallerySection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <GlitchSlider />
      <AppGallerySection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
