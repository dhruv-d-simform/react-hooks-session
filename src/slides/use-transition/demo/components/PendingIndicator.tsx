type ContentTab = 'posts' | 'photos' | 'videos';

export function PendingIndicator({ tab }: { tab: ContentTab }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
            <span className="text-[11px] text-indigo-400">Loading {tab}…</span>
        </div>
    );
}
