export function CounterCard({
    title,
    code,
    count,
    onTriple,
    variant,
    note,
}: {
    title: string;
    code: string;
    count: number;
    onTriple: () => void;
    variant: 'direct' | 'functional';
    note: string;
}) {
    const isDirect = variant === 'direct';
    return (
        <div
            className={`rounded-xl border p-3 space-y-2 ${
                isDirect
                    ? 'bg-rose-900/10 border-rose-700/20'
                    : 'bg-emerald-900/10 border-emerald-700/20'
            }`}
        >
            <div className="flex items-center justify-between">
                <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                        isDirect ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                >
                    {title}
                </span>
                <span
                    className={`text-2xl font-black font-mono tabular-nums ${
                        isDirect ? 'text-rose-200' : 'text-emerald-200'
                    }`}
                >
                    {count}
                </span>
            </div>
            <p className="font-mono text-[10px] text-zinc-500">{code}</p>
            <button
                onClick={onTriple}
                className={`w-full py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    isDirect
                        ? 'bg-rose-900/30 border-rose-700/30 text-rose-300 hover:bg-rose-900/50'
                        : 'bg-emerald-900/30 border-emerald-700/30 text-emerald-300 hover:bg-emerald-900/50'
                }`}
            >
                Set × 3
            </button>
            <p className="text-[10px] text-zinc-600 leading-relaxed">{note}</p>
        </div>
    );
}
