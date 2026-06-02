export function ConnectionLog({ entries }: { entries: string[] }) {
    if (entries.length === 0)
        return (
            <p className="text-[11px] text-zinc-600 text-center py-3">
                Interact above to see connection log
            </p>
        );
    return (
        <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 space-y-0.5 font-mono">
            {entries.map((e, i) => (
                <p
                    key={i}
                    className={`text-[11px] ${
                        i === 0 ? 'text-zinc-300' : 'text-zinc-600'
                    } ${e.includes('Disconnected') ? 'text-rose-500/70' : ''}`}
                >
                    {e}
                </p>
            ))}
        </div>
    );
}
