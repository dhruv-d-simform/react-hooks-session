import type { ProfileTab } from './TabContent';

const TABS: Record<ProfileTab, string> = {
    about: 'About ⚡',
    posts: 'Posts 🐢',
    photos: 'Photos 🐢',
};

export function ProfileTabBar({
    active,
    pendingTab,
    onSelect,
}: {
    active: ProfileTab;
    pendingTab?: ProfileTab | null;
    onSelect: (tab: ProfileTab) => void;
}) {
    return (
        <div className="flex items-center gap-1 bg-zinc-800 p-1 rounded-lg">
            {(Object.entries(TABS) as [ProfileTab, string][]).map(
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
                        {pendingTab === tab && (
                            <span className="ml-1.5 inline-block animate-spin">
                                ◌
                            </span>
                        )}
                    </button>
                )
            )}
        </div>
    );
}
