import { useState, useEffect } from 'react';
import { TimerDisplay } from './components/TimerDisplay';
import { PresetPicker } from './components/PresetPicker';
import { PRESETS } from './utils/presets';
import { TimerControls } from './components/TimerControls';
import { DoneBanner } from './components/DoneBanner';
import { ShortcutHints } from './components/ShortcutHints';

const APP_TITLE = 'react-hooks';

function formatTime(totalSeconds: number) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function FocusTimer() {
    const [duration, setDuration] = useState(PRESETS[0].seconds);
    const [remaining, setRemaining] = useState(PRESETS[0].seconds);
    const [running, setRunning] = useState(false);
    const [sessionsDone, setSessionsDone] = useState(0);
    const [showDone, setShowDone] = useState(false);

    // Tick down once per second while running, finish at zero
    useEffect(() => {
        if (!running || remaining === 0) return;

        const id = setTimeout(() => {
            const next = remaining - 1;
            setRemaining(next);
            if (next === 0) {
                setRunning(false);
                setSessionsDone((n) => n + 1);
                setShowDone(true);
            }
        }, 1000);

        return () => clearTimeout(id);
    }, [running, remaining]);

    // Auto-dismiss the "done" banner after 4 seconds
    useEffect(() => {
        if (!showDone) return;

        const id = setTimeout(() => {
            setShowDone(false);
        }, 4000);

        return () => clearTimeout(id);
    }, [showDone]);

    // Mirror the countdown into the browser tab title
    useEffect(() => {
        if (running) {
            document.title = `⏳ ${formatTime(remaining)} · Focus`;
        } else {
            document.title = APP_TITLE;
        }

        return () => {
            document.title = APP_TITLE;
        };
    }, [running, remaining]);

    // Keyboard shortcuts: Space = start/pause, R = reset
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                if (remaining > 0) setRunning((r) => !r);
            }
            if (e.key === 'r' || e.key === 'R') {
                setRunning(false);
                setRemaining(duration);
                setShowDone(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [remaining, duration]);

    const selectPreset = (seconds: number) => {
        setDuration(seconds);
        setRemaining(seconds);
        setRunning(false);
        setShowDone(false);
    };

    const toggle = () => {
        if (remaining > 0) setRunning((r) => !r);
    };

    const reset = () => {
        setRunning(false);
        setRemaining(duration);
        setShowDone(false);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <PresetPicker active={duration} onSelect={selectPreset} />
                <span className="text-[11px] text-zinc-500">
                    Sessions done:{' '}
                    <span className="font-mono text-teal-300 font-semibold">
                        {sessionsDone}
                    </span>
                </span>
            </div>

            <TimerDisplay
                time={formatTime(remaining)}
                progress={duration > 0 ? 1 - remaining / duration : 0}
                running={running}
            />

            {showDone && <DoneBanner />}

            <TimerControls
                running={running}
                canStart={remaining > 0}
                onToggle={toggle}
                onReset={reset}
            />

            <ShortcutHints />
        </div>
    );
}
