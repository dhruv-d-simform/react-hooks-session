export function TimerControls({
    running,
    onStart,
    onStop,
    onReset,
}: {
    running: boolean;
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
}) {
    return (
        <div className="grid grid-cols-3 gap-2">
            <button
                onClick={onStart}
                disabled={running}
                className="py-2 rounded-lg bg-emerald-900/30 border border-emerald-700/40 text-xs text-emerald-300 hover:bg-emerald-900/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                Start
            </button>
            <button
                onClick={onStop}
                disabled={!running}
                className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-xs text-amber-300 hover:bg-amber-900/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                Stop
            </button>
            <button
                onClick={onReset}
                className="py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
                Reset
            </button>
        </div>
    );
}
