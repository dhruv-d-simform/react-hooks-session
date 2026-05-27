import { useState, useEffect } from 'react';

export default function HooksCounter() {
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(0);

    // 1️⃣ Title sync — setup + cleanup in one place
    useEffect(() => {
        document.title = `Count: ${count}`;
        return () => {
            document.title = 'React Hooks';
        };
    }, [count]);

    // 2️⃣ Timer — start and cleanup live together
    useEffect(() => {
        const id = setInterval(() => setTimer((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="space-y-4">
            <p className="text-xs text-zinc-500">Same counter — same behaviour, cleaner code:</p>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setCount((c) => c - 1)}
                    className="w-10 h-10 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-xl font-bold transition-colors"
                >
                    −
                </button>
                <span className="text-5xl font-black font-mono w-20 text-center tabular-nums">
                    {count}
                </span>
                <button
                    onClick={() => setCount((c) => c + 1)}
                    className="w-10 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xl font-bold transition-colors"
                >
                    +
                </button>
            </div>
            <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-4 space-y-1">
                <p className="text-xs text-zinc-400">
                    ⏱ Component alive:{' '}
                    <span className="font-mono text-indigo-300 font-semibold">{timer}s</span>
                </p>
                <p className="text-xs text-zinc-600">
                    Timer starts + cleans up in the same useEffect
                </p>
            </div>
        </div>
    );
}

export const fileUrl = '/src/slides/class-components/demo/HooksCounter.tsx';
