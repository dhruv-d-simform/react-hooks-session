export function TimerDisplay({
    time,
    progress,
    running,
}: {
    time: string;
    progress: number;
    running: boolean;
}) {
    return (
        <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-6 text-center space-y-4">
            <p
                className={`font-mono text-6xl font-bold tabular-nums tracking-tight ${
                    running ? 'text-teal-300' : 'text-zinc-300'
                }`}
            >
                {time}
            </p>
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${
                        running ? 'bg-teal-400' : 'bg-zinc-600'
                    }`}
                    style={{ width: `${Math.min(100, progress * 100)}%` }}
                />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                {running ? 'Focusing…' : 'Paused'}
            </p>
        </div>
    );
}
