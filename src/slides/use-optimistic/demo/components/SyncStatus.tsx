export function SyncStatus({ isPending }: { isPending: boolean }) {
    return (
        <div className="flex items-center gap-2 bg-zinc-800/40 border border-zinc-700/30 rounded-lg px-3 py-2">
            <div
                className={`w-2 h-2 rounded-full ${isPending ? 'bg-amber-400 animate-pulse' : 'bg-zinc-600'}`}
            />
            <span className="text-[11px] text-zinc-500">
                {isPending ? 'Request in flight…' : 'All synced with server'}
            </span>
        </div>
    );
}
