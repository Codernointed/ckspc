import MinistriesView, { type MinistryItem } from '@/components/public/MinistriesView';
import { getCollectionItems } from '@/lib/collections';

export const dynamic = 'force-dynamic';

export default async function MinistriesPage() {
  const items = await getCollectionItems('ministries');
  const ministries: MinistryItem[] = items.map((it) => ({
    title: it.title,
    description: it.description,
    imageUrl: it.imageUrl || undefined,
    label: it.label || undefined,
    buttonText: it.buttonText || undefined,
  }));

  return <MinistriesView items={ministries} />;
}
