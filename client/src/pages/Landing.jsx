import ContactToast from '../components/ContactToast';
import FeatureSection from '../components/landing/FeatureSection';
import FooterSection from '../components/landing/FooterSection';
import HeroSection from '../components/landing/HeroSection';
import TestiSection from '../components/landing/TestiSection';
import TryoutSection from '../components/landing/TryoutSection';

export default function Landing() {
  return (
    <>
      <HeroSection />
      <TryoutSection />
      <TestiSection />
      <FeatureSection />
      <FooterSection />
      <ContactToast />
    </>
  );
}
