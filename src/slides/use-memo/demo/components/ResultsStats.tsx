export function ResultsStats({
    count,
    total,
    computations,
    memoized,
}: {
    count: number;
    total: number;
    computations: number;
    memoized: boolean;
}) {
    return (
        <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2">
            <span className="text-xs text-zinc-500">
                Showing{' '}
                <span className="font-mono text-zinc-300">{count}</span> /{' '}
                {total.toLocaleString()} items
            </span>
            <span className="text-xs font-mono text-zinc-500">
                computations:{' '}
                <span className={memoized ? 'text-emerald-400' : 'text-rose-400'}>
                    {computations}
                </span>
            </span>
        </div>
    );
}
