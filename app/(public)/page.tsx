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
import { getHomeContent } from '@/lib/content';
import { getBranches, mapsUrl } from '@/lib/branches';

// Content is admin-editable and read at request time.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getHomeContent();
  const branchRows = await getBranches();
  const branchItems = branchRows.map((b) => ({
    name: b.name,
    address: b.address ?? '',
    area: b.area ?? '',
    service: b.serviceTimes ?? '',
    phone: b.phone ?? '',
    isHQ: b.isHq,
    img: b.imageUrl ?? '',
    mapsHref: mapsUrl(b),
  }));

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <OrganicElements />
      <Header />
      <main>
        <Hero />
        <Welcome content={content.welcome} />
        <StatsStrip />
        <ThreadConnector />
        <Services />
        <VisionMission content={content.vision_mission} />
        <ThreadConnector flip />
        <Founder />
        <GalleryStrip />
        <Branches items={branchItems} />
        <ThreadConnector />
        <Sermons />
        <ConnectCta content={content.connect_cta} />
      </main>
      <Footer />
    </div>
  );
}
