type ContentTab = 'posts' | 'photos' | 'videos';

const CONTENT_TABS: Record<ContentTab, string> = {
    posts: 'Posts',
    photos: 'Photos',
    videos: 'Videos',
};

export function ContentTabBar({
    active,
    onSelect,
}: {
    active: ContentTab;
    onSelect: (tab: ContentTab) => void;
}) {
    return (
        <div className="flex items-center gap-1 bg-zinc-800 p-1 rounded-lg">
            {(Object.entries(CONTENT_TABS) as [ContentTab, string][]).map(
                ([tab, label]) => (
                    <button
                        key={tab}
                        onClick={() => onSelect(tab)}
                        className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-colors ${
                            active === tab
                                ? 'bg-indigo-600 text-white'
                                : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                        {label}
                    </button>
                )
            )}
        </div>
    );
}
