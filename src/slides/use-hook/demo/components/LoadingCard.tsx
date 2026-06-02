export function LoadingCard() {
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-4 space-y-3 animate-pulse">
            <div className="h-3 bg-zinc-700 rounded w-3/4" />
            <div className="h-2 bg-zinc-800 rounded w-full" />
            <div className="h-2 bg-zinc-800 rounded w-5/6" />
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                <span className="text-[10px] text-zinc-600">Loading post…</span>
            </div>
        </div>
    );
}
