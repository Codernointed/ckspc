import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Welcome from '@/components/Welcome';
import StatsStrip from '@/components/StatsStrip';
import Services from '@/components/Services';
import VisionMission from '@/components/VisionMission';
import Founder from '@/components/Founder';
import GalleryStrip from '@/components/GalleryStrip';
import Branches from '@/components/Branches';
import Sermons from '@/components/Sermons';
import ConnectCta from '@/components/ConnectCta';
import Footer from '@/components/Footer';
import OrganicElements from '@/components/OrganicElements';
import ThreadConnector from '@/components/ThreadConnector';

export default function Home() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <OrganicElements />
      <Header />
      <main>
        <Hero />
        <Welcome />
        <StatsStrip />
        <ThreadConnector />
        <Services />
        <VisionMission />
        <ThreadConnector flip />
        <Founder />
        <GalleryStrip />
        <Branches />
        <ThreadConnector />
        <Sermons />
        <ConnectCta />
      </main>
      <Footer />
    </div>
  );
}
