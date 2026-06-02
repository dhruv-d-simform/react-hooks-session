export function ActionLog({ entries }: { entries: string[] }) {
    if (entries.length === 0) return null;
    return (
        <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                Actions called
            </p>
            <div className="space-y-0.5">
                {entries.map((entry, i) => (
                    <p
                        key={i}
                        className={`text-[11px] font-mono ${i === 0 ? 'text-amber-300' : 'text-zinc-600'}`}
                    >
                        {entry}
                    </p>
                ))}
            </div>
        </div>
    );
}
