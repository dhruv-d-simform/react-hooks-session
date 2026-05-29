import { useState } from 'react';

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
                <div className="bg-zinc-800/60 border border-rose-700/30 rounded-xl p-4 space-y-3">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-0.5">
                            Direct Update
                        </p>
                        <code className="text-[10px] text-zinc-500 font-mono">
                            setCount(count + 1)
                        </code>
                    </div>
                    <div className="text-4xl font-black font-mono text-center tabular-nums text-rose-300">
                        {directCount}
                    </div>
                    <button
                        onClick={handleDirect}
                        className="w-full py-2 rounded-lg bg-rose-900/30 border border-rose-700/40 text-xs text-rose-300 hover:bg-rose-900/50 transition-colors"
                    >
                        Triple +1
                    </button>
                    <p className="text-[10px] text-zinc-600 leading-relaxed">
                        All 3 calls read the same{' '}
                        <span className="font-mono">count</span> snapshot — only
                        adds 1 ❌
                    </p>
                </div>

                <div className="bg-zinc-800/60 border border-emerald-700/30 rounded-xl p-4 space-y-3">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
                            Functional Update
                        </p>
                        <code className="text-[10px] text-zinc-500 font-mono">
                            setCount(c =&gt; c + 1)
                        </code>
                    </div>
                    <div className="text-4xl font-black font-mono text-center tabular-nums text-emerald-300">
                        {safeCount}
                    </div>
                    <button
                        onClick={handleSafe}
                        className="w-full py-2 rounded-lg bg-emerald-900/30 border border-emerald-700/40 text-xs text-emerald-300 hover:bg-emerald-900/50 transition-colors"
                    >
                        Triple +1
                    </button>
                    <p className="text-[10px] text-zinc-600 leading-relaxed">
                        Each callback gets the latest queued{' '}
                        <span className="font-mono">c</span> — adds 3 ✅
                    </p>
                </div>
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
