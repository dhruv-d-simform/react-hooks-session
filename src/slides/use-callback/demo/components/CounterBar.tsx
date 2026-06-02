export function CounterBar({
    count,
    onIncrement,
}: {
    count: number;
    onIncrement: () => void;
}) {
    return (
        <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2">
            <span className="text-xs text-zinc-400">
                Parent counter:{' '}
                <span className="font-mono text-zinc-200">{count}</span>
            </span>
            <button
                onClick={onIncrement}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white transition-colors"
            >
                +1 (causes parent re-render)
            </button>
        </div>
    );
}
