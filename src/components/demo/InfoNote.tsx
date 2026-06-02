const colorMap = {
    emerald: 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400',
    rose: 'bg-rose-900/15 border-rose-700/25 text-rose-400',
    amber: 'bg-amber-900/15 border-amber-700/25 text-amber-400',
    purple: 'bg-purple-900/15 border-purple-700/25 text-purple-300',
    pink: 'bg-pink-900/15 border-pink-700/25 text-pink-300',
    zinc: 'bg-zinc-800/40 border-zinc-700/30 text-zinc-500',
    indigo: 'bg-indigo-900/20 border-indigo-700/30 text-zinc-400',
    teal: 'bg-teal-900/15 border-teal-700/25 text-teal-300',
};

export default function InfoNote({
    color = 'zinc',
    children,
}: {
    color?: keyof typeof colorMap;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`rounded-lg p-3 border text-[11px] leading-relaxed ${colorMap[color]}`}
        >
            {children}
        </div>
    );
}
