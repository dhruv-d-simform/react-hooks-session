type ContentTab = 'posts' | 'photos' | 'videos';

const ITEMS: Record<ContentTab, string[]> = {
    posts: [
        'React 19 release notes',
        'Understanding hooks',
        'Server components explained',
        'New concurrent features',
    ],
    photos: [
        'Sunset over mountains',
        'City lights at night',
        'Morning coffee',
        'Abstract architecture',
    ],
    videos: [
        'useTransition deep dive',
        'React performance tips',
        'Building with RSC',
        'Hooks workshop recap',
    ],
};

ITEMS.posts = Array(1000).fill(ITEMS.posts).flat();
ITEMS.photos = Array(1000).fill(ITEMS.photos).flat();
ITEMS.videos = Array(1000).fill(ITEMS.videos).flat();

export function SlowTabContent({ tab }: { tab: ContentTab }) {
    return (
        <div className="space-y-2 max-h-72 overflow-y-auto slide-scroll">
            {ITEMS[tab].map((item) => (
                <div
                    key={item}
                    className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2.5"
                >
                    <p className="text-xs text-zinc-300">{item}</p>
                </div>
            ))}
        </div>
    );
}
