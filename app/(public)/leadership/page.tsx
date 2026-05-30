import LeadershipView, {
  type LeadershipTier,
  type Leader,
} from '@/components/public/LeadershipView';
import { getCollectionItems } from '@/lib/collections';

export const dynamic = 'force-dynamic';

const TIER_ORDER = [
  'Presiding Leaders',
  'Branch Pastors',
  'Pastors',
  'Elders',
  'Deacons & Deaconesses',
];

export default async function LeadershipPage() {
  const items = await getCollectionItems('leadership');

  // Group flat items into tiers, preserving the canonical tier order.
  const tiers: LeadershipTier[] = TIER_ORDER.map((label) => ({
    label,
    leaders: items
      .filter((it) => it.tier === label)
      .map<Leader>((it) => ({
        name: it.name,
        title: it.title,
        initials: it.initials,
        imageSrc: it.imageUrl || undefined,
        branch: it.branch || undefined,
        description: it.description || undefined,
      })),
  }));

  return <LeadershipView tiers={tiers} />;
}
