import { SlowCard } from './SlowCard';

export type ProfileTab = 'about' | 'posts' | 'photos';

const POST_TITLES = [
    'Why we migrated to React 19',
    'Concurrent rendering explained',
    'My favorite custom hooks',
    'Server components in practice',
    'Debugging re-renders like a pro',
];

const PHOTO_TITLES = [
    'Team offsite 2026',
    'Conference talk recap',
    'Whiteboard architecture session',
    'Office hackathon night',
];

const POSTS = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    title: `${POST_TITLES[i % POST_TITLES.length]} — part ${Math.floor(i / POST_TITLES.length) + 1}`,
    meta: `${(i % 90) + 3} likes`,
}));

const PHOTOS = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    title: `${PHOTO_TITLES[i % PHOTO_TITLES.length]} #${i + 1}`,
    meta: `${(i % 12) + 1} MB`,
}));

export function TabContent({ tab }: { tab: ProfileTab }) {
    if (tab === 'about') {
        return (
            <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-3 space-y-1">
                <p className="text-xs text-zinc-200 font-medium">
                    Jane Developer
                </p>
                <p className="text-[11px] text-zinc-500">
                    Frontend engineer. This tab is cheap to render — it appears
                    instantly. The other two tabs render hundreds of
                    artificially slow cards.
                </p>
            </div>
        );
    }

    const items = tab === 'posts' ? POSTS : PHOTOS;

    return (
        <div className="space-y-1.5 max-h-56 overflow-y-auto slide-scroll">
            {items.map((item) => (
                <SlowCard key={item.id} title={item.title} meta={item.meta} />
            ))}
        </div>
    );
}
