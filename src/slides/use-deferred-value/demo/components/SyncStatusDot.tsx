export function SyncStatusDot({ isStale }: { isStale: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <div
                className={`w-2 h-2 rounded-full transition-colors ${
                    isStale ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                }`}
            />
            <span className="text-[11px] text-zinc-500">
                {isStale ? 'List is catching up to input…' : 'List is in sync'}
            </span>
        </div>
    );
}
