export function StoreCard({
    label,
    value,
    code,
    color,
}: {
    label: string;
    value: React.ReactNode;
    code: string;
    color: 'emerald' | 'purple' | 'sky';
}) {
    const colorMap = {
        emerald: 'bg-emerald-900/15 border-emerald-700/25 text-emerald-300',
        purple: 'bg-purple-900/15 border-purple-700/25 text-purple-300',
        sky: 'bg-sky-900/15 border-sky-700/25 text-sky-300',
    };

    return (
        <div
            className={`rounded-xl border p-4 space-y-2 ${colorMap[color].split(' ').slice(0, 2).join(' ')}`}
        >
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {label}
                </span>
                <span
                    className={`text-sm font-bold font-mono ${colorMap[color].split(' ')[2]}`}
                >
                    {value}
                </span>
            </div>
            <p className="font-mono text-[10px] text-zinc-600">{code}</p>
        </div>
    );
}
