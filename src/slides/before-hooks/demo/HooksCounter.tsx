import { useState, useEffect } from 'react';
import { ComponentAliveTimer } from './components/ComponentAliveTimer';

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

    const increment = () => setCount((c) => c + 1);
    const decrement = () => setCount((c) => c - 1);

    return (
        <div className="space-y-4">
            <p className="text-xs text-zinc-500">
                Same counter — same behaviour, cleaner code:
            </p>
            <div className="flex items-center gap-4">
                <button
                    onClick={decrement}
                    className="w-10 h-10 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-xl font-bold transition-colors"
                >
                    −
                </button>
                <span className="text-5xl font-black font-mono w-20 text-center tabular-nums">
                    {count}
                </span>
                <button
                    onClick={increment}
                    className="w-10 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xl font-bold transition-colors"
                >
                    +
                </button>
            </div>
            <ComponentAliveTimer
                seconds={timer}
                description="Timer starts + cleans up in the same useEffect"
            />
        </div>
    );
}

export const fileUrl = '/src/slides/before-hooks/demo/HooksCounter.tsx';
