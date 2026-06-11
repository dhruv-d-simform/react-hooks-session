import { useState, useEffect } from 'react';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';

const DURATION = 30;
const APP_TITLE = 'react-hooks';

function formatTime(totalSeconds: number) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function FocusTimer() {
    const [remaining, setRemaining] = useState(DURATION);
    const [running, setRunning] = useState(false);
    const [sessionsDone, setSessionsDone] = useState(0);

    // Tick down once per second while running, finish at zero
    useEffect(() => {
        if (!running || remaining === 0) return;

        const id = setTimeout(() => {
            const next = remaining - 1;
            setRemaining(next);
            if (next === 0) {
                setRunning(false);
                setSessionsDone((n) => n + 1);
            }
        }, 1000);

        return () => clearTimeout(id);
    }, [running, remaining]);

    // Show the countdown in the browser tab while running
    useEffect(() => {
        document.title = running
            ? `⏳ ${formatTime(remaining)} · Focus`
            : APP_TITLE;
        return () => {
            document.title = APP_TITLE;
        };
    }, [running, remaining]);

    const toggle = () => {
        if (remaining > 0) setRunning((r) => !r);
    };

    const reset = () => {
        setRunning(false);
        setRemaining(DURATION);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-end">
                <span className="text-[11px] text-zinc-500">
                    Sessions done:{' '}
                    <span className="font-mono text-teal-300 font-semibold">
                        {sessionsDone}
                    </span>
                </span>
            </div>

            <TimerDisplay
                time={formatTime(remaining)}
                progress={DURATION > 0 ? 1 - remaining / DURATION : 0}
                running={running}
            />

            <TimerControls
                running={running}
                canStart={remaining > 0}
                onToggle={toggle}
                onReset={reset}
            />

            <p className="text-center text-[11px] text-zinc-600">
                👀 watch the browser tab title while it runs
            </p>
        </div>
    );
}
