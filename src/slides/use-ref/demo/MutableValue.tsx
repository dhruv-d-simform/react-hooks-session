import { useRef, useState } from 'react';

export const fileUrl = '/src/slides/use-ref/demo/MutableValue.tsx';

export default function MutableValue() {
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const start = () => {
        if (running) return;
        setRunning(true);
        intervalRef.current = setInterval(() => {
            setElapsed((e) => e + 1);
        }, 100);
    };

    const stop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setRunning(false);
    };

    const reset = () => {
        stop();
        setElapsed(0);
    };

    const seconds = (elapsed / 10).toFixed(1);

    return (
        <div className="space-y-4">
            <p className="text-xs text-zinc-500">
                The interval ID lives in{' '}
                <span className="font-mono text-amber-300">
                    intervalRef.current
                </span>
                . Storing it there doesn't cause re-renders — only{' '}
                <span className="font-mono text-indigo-300">elapsed</span>{' '}
                (state) does.
            </p>

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

            <div className="grid grid-cols-3 gap-2">
                <button
                    onClick={start}
                    disabled={running}
                    className="py-2 rounded-lg bg-emerald-900/30 border border-emerald-700/40 text-xs text-emerald-300 hover:bg-emerald-900/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    Start
                </button>
                <button
                    onClick={stop}
                    disabled={!running}
                    className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-xs text-amber-300 hover:bg-amber-900/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    Stop
                </button>
                <button
                    onClick={reset}
                    className="py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    Reset
                </button>
            </div>

            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3 font-mono text-[11px] space-y-1.5">
                <p className="text-zinc-500">
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-amber-300">intervalRef</span> ={' '}
                    <span className="text-yellow-400">useRef</span>(
                    <span className="text-orange-300">null</span>)
                </p>
                <p className="text-zinc-500">
                    <span className="text-amber-300">intervalRef</span>.current
                    ={' '}
                    <span className="text-zinc-300">
                        {intervalRef.current ? 'setInterval(...)' : 'null'}
                    </span>
                    <span className="text-zinc-600 ml-2">
                        ← live value, no re-render
                    </span>
                </p>
                <p className="text-zinc-500">
                    <span className="text-indigo-300">elapsed</span> ={' '}
                    <span className="text-zinc-300">{elapsed}</span>
                    <span className="text-zinc-600 ml-2">
                        ← state, causes re-render
                    </span>
                </p>
            </div>
        </div>
    );
}
