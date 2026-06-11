// Live-refactor cheat sheet — NOT imported anywhere.
// Copy these into FocusTimer.tsx during the session.
// See the bottom for what FocusTimer collapses into.

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

// ── Layer 2: a hook composed out of another custom hook ──────────────

export function useCountdown(duration: number, onComplete?: () => void) {
    const [remaining, setRemaining] = useState(duration);
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

    return { remaining, running, toggle, reset };
}

// ── What FocusTimer collapses into ───────────────────────────────────
//
// export default function FocusTimer() {
//     const [sessionsDone, setSessionsDone] = useState(0);
//
//     const timer = useCountdown(DURATION, () => {
//         setSessionsDone((n) => n + 1);
//     });
//
//     useDocumentTitle(
//         timer.running ? `⏳ ${formatTime(timer.remaining)} · Focus` : null
//     );
//
//     return (
//         <div className="space-y-5">
//             <div className="flex items-center justify-end">
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
//                 progress={DURATION > 0 ? 1 - timer.remaining / DURATION : 0}
//                 running={timer.running}
//             />
//
//             <TimerControls
//                 running={timer.running}
//                 canStart={timer.remaining > 0}
//                 onToggle={timer.toggle}
//                 onReset={timer.reset}
//             />
//
//             <p className="text-center text-[11px] text-zinc-600">
//                 👀 watch the browser tab title while it runs
//             </p>
//         </div>
//     );
// }
