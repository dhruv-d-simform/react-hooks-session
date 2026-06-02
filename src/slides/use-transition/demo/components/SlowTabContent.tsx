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

export function SlowTabContent({ tab }: { tab: ContentTab }) {
    const start = performance.now();
    while (performance.now() - start < 80) {}

    return (
        <div className="space-y-2">
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
