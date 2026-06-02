export function TimerDisplay({
    seconds,
    running,
}: {
    seconds: string;
    running: boolean;
}) {
    return (
        <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-6 text-center space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Elapsed
            </p>
            <p className="text-6xl font-black font-mono tabular-nums text-zinc-100">
                {seconds}
                <span className="text-2xl text-zinc-500">s</span>
            </p>
            <div className="flex items-center justify-center gap-1.5">
                <span
                    className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`}
                />
                <span className="text-[10px] text-zinc-500">
                    {running ? 'running' : 'stopped'}
                </span>
            </div>
        </div>
    );
}
