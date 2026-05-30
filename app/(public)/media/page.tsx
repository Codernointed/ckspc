import MediaView from '@/components/public/MediaView';
import { getCollectionItems } from '@/lib/collections';

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  const [videoItems, galleryItems] = await Promise.all([
    getCollectionItems('media_videos'),
    getCollectionItems('media_gallery'),
  ]);

  const videos = videoItems.map((v) => ({
    title: v.title,
    label: v.label,
    imageUrl: v.imageUrl,
    videoUrl: v.videoUrl || undefined,
  }));

  const gallery = galleryItems.map((g) => ({
    imageUrl: g.imageUrl,
    alt: g.alt,
    category: g.category,
  }));

  return <MediaView videos={videos} gallery={gallery} />;
}
