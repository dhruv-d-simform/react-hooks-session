import { useRef, useState } from 'react';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';

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

            <TimerDisplay seconds={seconds} running={running} />

            <TimerControls
                running={running}
                onStart={start}
                onStop={stop}
                onReset={reset}
            />

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
