export function TimerControls({
    running,
    canStart,
    onToggle,
    onReset,
}: {
    running: boolean;
    canStart: boolean;
    onToggle: () => void;
    onReset: () => void;
}) {
    return (
        <div className="flex gap-2">
            <button
                onClick={onToggle}
                disabled={!canStart}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    running
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                        : 'bg-teal-500/20 border border-teal-500/40 text-teal-300 hover:bg-teal-500/30'
                }`}
            >
                {running ? '⏸ Pause' : '▶ Start'}
            </button>
            <button
                onClick={onReset}
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
                ↺ Reset
            </button>
        </div>
    );
}
