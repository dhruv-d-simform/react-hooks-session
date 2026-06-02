export function FireCard({
    label,
    description,
    color,
    fires,
    note,
}: {
    label: string;
    description: string;
    color: 'rose' | 'emerald' | 'indigo';
    fires: number;
    note: string;
}) {
    const colorMap = {
        rose: {
            bg: 'bg-rose-900/15 border-rose-700/25',
            text: 'text-rose-300',
            badge: 'bg-rose-900/40 text-rose-300 border-rose-700/30',
        },
        emerald: {
            bg: 'bg-emerald-900/15 border-emerald-700/25',
            text: 'text-emerald-300',
            badge: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/30',
        },
        indigo: {
            bg: 'bg-indigo-900/15 border-indigo-700/25',
            text: 'text-indigo-300',
            badge: 'bg-indigo-900/40 text-indigo-300 border-indigo-700/30',
        },
    };
    const c = colorMap[color];

    return (
        <div className={`rounded-xl border p-3 ${c.bg}`}>
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${c.text}`}
                    >
                        {label}
                    </span>
                    <span className="text-zinc-600 text-[10px]">—</span>
                    <span className="text-[10px] text-zinc-400">
                        {description}
                    </span>
                </div>
                <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${c.badge}`}
                >
                    ×{fires}
                </span>
            </div>
            <p className="text-[10px] text-zinc-600 mt-0.5">{note}</p>
        </div>
    );
}
