import { useRef, useState } from 'react';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';
import { RefLiveDisplay } from './components/RefLiveDisplay';

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

            <RefLiveDisplay
                intervalActive={!!intervalRef.current}
                elapsed={elapsed}
            />
        </div>
    );
}
