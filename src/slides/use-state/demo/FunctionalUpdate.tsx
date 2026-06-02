import { useState } from 'react';
import { CounterCard } from './components/CounterCard';

export const fileUrl = '/src/slides/use-state/demo/FunctionalUpdate.tsx';

export default function FunctionalUpdate() {
    const [directCount, setDirectCount] = useState(0);
    const [safeCount, setSafeCount] = useState(0);

    const handleDirect = () => {
        // All 3 calls snapshot the same `directCount` — React batches them
        setDirectCount(directCount + 1);
        setDirectCount(directCount + 1);
        setDirectCount(directCount + 1);
    };

    const handleSafe = () => {
        // Each callback receives the latest queued state
        setSafeCount((c) => c + 1);
        setSafeCount((c) => c + 1);
        setSafeCount((c) => c + 1);
    };

    return (
        <div className="space-y-4">
            <p className="text-xs text-zinc-500">
                Both buttons call their setter{' '}
                <span className="font-mono text-zinc-300">3×</span> — only one
                gets the right answer.
            </p>

            <div className="grid grid-cols-2 gap-3">
                <CounterCard
                    title="Direct Update"
                    code="setCount(count + 1)"
                    count={directCount}
                    onTriple={handleDirect}
                    variant="direct"
                    note="All 3 calls read the same count snapshot — only adds 1 ❌"
                />
                <CounterCard
                    title="Functional Update"
                    code="setCount(c => c + 1)"
                    count={safeCount}
                    onTriple={handleSafe}
                    variant="functional"
                    note="Each callback gets the latest queued c — adds 3 ✅"
                />
            </div>

            <div className="bg-indigo-900/20 border border-indigo-700/30 rounded-lg p-3">
                <p className="text-xs text-zinc-400 leading-relaxed">
                    💡{' '}
                    <span className="text-indigo-300 font-medium">
                        Rule of thumb
                    </span>{' '}
                    — If the new state depends on the previous value, always use
                    the functional form.
                </p>
            </div>
        </div>
    );
}
