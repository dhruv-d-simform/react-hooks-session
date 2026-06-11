// Live-refactor cheat sheet — NOT imported anywhere.
// Copy these into FocusTimer.tsx (or paste this whole file and import from it)
// during the session. See the bottom for what FocusTimer collapses into.

import { useState, useEffect, useRef } from 'react';

// ── Layer 1: built directly on useEffect ─────────────────────────────

export function useInterval(callback: () => void, delay: number | null) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        if (delay === null) return;
        const id = setInterval(() => callbackRef.current(), delay);
        return () => clearInterval(id);
    }, [delay]);
}

export function useTimeout(callback: () => void, delay: number | null) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        if (delay === null) return;
        const id = setTimeout(() => callbackRef.current(), delay);
        return () => clearTimeout(id);
    }, [delay]);
}

export function useDocumentTitle(
    title: string | null,
    fallback = 'react-hooks'
) {
    useEffect(() => {
        document.title = title ?? fallback;
        return () => {
            document.title = fallback;
        };
    }, [title, fallback]);
}

// Keys are KeyboardEvent.code values: 'Space', 'KeyR', ...
export function useKeyboardShortcuts(handlers: Record<string, () => void>) {
    const handlersRef = useRef(handlers);

    useEffect(() => {
        handlersRef.current = handlers;
    });

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                return;
            }
            const handler = handlersRef.current[e.code];
            if (handler) {
                e.preventDefault();
                handler();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
}

// ── Layer 2: hooks composed out of other custom hooks ────────────────

export function useCountdown(initialDuration: number, onComplete?: () => void) {
    const [duration, setDuration] = useState(initialDuration);
    const [remaining, setRemaining] = useState(initialDuration);
    const [running, setRunning] = useState(false);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    });

    useInterval(
        () => {
            const next = remaining - 1;
            setRemaining(next);
            if (next === 0) {
                setRunning(false);
                onCompleteRef.current?.();
            }
        },
        running && remaining > 0 ? 1000 : null
    );

    const toggle = () => {
        if (remaining > 0) setRunning((r) => !r);
    };

    const reset = () => {
        setRunning(false);
        setRemaining(duration);
    };

    const restart = (newDuration: number) => {
        setDuration(newDuration);
        setRemaining(newDuration);
        setRunning(false);
    };

    return { duration, remaining, running, toggle, reset, restart };
}

// A boolean flag that hides itself after `durationMs` — built on useTimeout
export function useTimedFlag(durationMs: number) {
    const [visible, setVisible] = useState(false);

    useTimeout(() => setVisible(false), visible ? durationMs : null);

    return {
        visible,
        show: () => setVisible(true),
        hide: () => setVisible(false),
    };
}

// ── What FocusTimer collapses into ───────────────────────────────────
//
// export default function FocusTimer() {
//     const [sessionsDone, setSessionsDone] = useState(0);
//
//     const done = useTimedFlag(4000);
//
//     const timer = useCountdown(PRESETS[0].seconds, () => {
//         setSessionsDone((n) => n + 1);
//         done.show();
//     });
//
//     useDocumentTitle(
//         timer.running ? `⏳ ${formatTime(timer.remaining)} · Focus` : null
//     );
//
//     useKeyboardShortcuts({
//         Space: timer.toggle,
//         KeyR: () => {
//             timer.reset();
//             done.hide();
//         },
//     });
//
//     const selectPreset = (seconds: number) => {
//         timer.restart(seconds);
//         done.hide();
//     };
//
//     return (
//         <div className="space-y-5">
//             <div className="flex items-center justify-between">
//                 <PresetPicker active={timer.duration} onSelect={selectPreset} />
//                 <span className="text-[11px] text-zinc-500">
//                     Sessions done:{' '}
//                     <span className="font-mono text-teal-300 font-semibold">
//                         {sessionsDone}
//                     </span>
//                 </span>
//             </div>
//
//             <TimerDisplay
//                 time={formatTime(timer.remaining)}
//                 progress={
//                     timer.duration > 0
//                         ? 1 - timer.remaining / timer.duration
//                         : 0
//                 }
//                 running={timer.running}
//             />
//
//             {done.visible && <DoneBanner />}
//
//             <TimerControls
//                 running={timer.running}
//                 canStart={timer.remaining > 0}
//                 onToggle={timer.toggle}
//                 onReset={() => {
//                     timer.reset();
//                     done.hide();
//                 }}
//             />
//
//             <ShortcutHints />
//         </div>
//     );
// }
