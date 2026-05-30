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
import { getCollectionItems } from '@/lib/collections';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getHomeContent();

  // All collection reads in parallel
  const [heroItems, statsItems, servicesItems, founderItems, galleryItems, branchRows] =
    await Promise.all([
      getCollectionItems('hero_slides'),
      getCollectionItems('stats'),
      getCollectionItems('services'),
      getCollectionItems('founder'),
      getCollectionItems('gallery'),
      getBranches(),
    ]);

  const heroSlides = heroItems.map((s) => ({
    bg: s.bg, label: s.label, title: s.title, subtitle: s.subtitle,
  }));
  const statsData = statsItems.map((s) => ({ number: s.number, label: s.label }));
  const servicesData = servicesItems.map((s) => ({
    title: s.title, desc: s.desc, img: s.img, time: s.time,
  }));
  const founderData = founderItems[0]
    ? {
        name: founderItems[0].name,
        role: founderItems[0].role,
        imageUrl: founderItems[0].imageUrl || undefined,
        bio1: founderItems[0].bio1,
        bio2: founderItems[0].bio2 || undefined,
        bio3: founderItems[0].bio3 || undefined,
        quote: founderItems[0].quote || undefined,
      }
    : undefined;
  const galleryImages = galleryItems.map((g) => g.imageUrl).filter(Boolean);
  const branchItems = branchRows.map((b) => ({
    name: b.name, address: b.address ?? '', area: b.area ?? '',
    service: b.serviceTimes ?? '', phone: b.phone ?? '',
    isHQ: b.isHq, img: b.imageUrl ?? '', mapsHref: mapsUrl(b),
  }));

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <OrganicElements />
      <Header />
      <main>
        <Hero slides={heroSlides} />
        <Welcome content={content.welcome} />
        <StatsStrip items={statsData} />
        <ThreadConnector />
        <Services items={servicesData} />
        <VisionMission content={content.vision_mission} />
        <ThreadConnector flip />
        <Founder data={founderData} />
        <GalleryStrip images={galleryImages} />
        <Branches items={branchItems} />
        <ThreadConnector />
        <Sermons />
        <ConnectCta content={content.connect_cta} />
      </main>
      <Footer />
    </div>
  );
}
