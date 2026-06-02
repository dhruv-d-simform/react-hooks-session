import { useState, useEffect, useRef } from 'react';
import { FireCard } from './components/FireCard';

export const fileUrl = '/src/slides/use-effect/demo/DepsExplorer.tsx';

export default function DepsExplorer() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Alice');

    const renderFires = useRef(0);
    const [mountFires, setMountFires] = useState(0);
    const [countFires, setCountFires] = useState(0);

    renderFires.current++;

    // Fires once on mount
    useEffect(() => {
        setMountFires((n) => n + 1);
    }, []);

    // Fires when count changes
    useEffect(() => {
        setCountFires((n) => n + 1);
    }, [count]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                        Count
                    </label>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCount((c) => c - 1)}
                            className="w-9 h-9 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-lg font-bold transition-colors"
                        >
                            −
                        </button>
                        <span className="text-xl font-black font-mono text-zinc-100 w-8 text-center tabular-nums">
                            {count}
                        </span>
                        <button
                            onClick={() => setCount((c) => c + 1)}
                            className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-lg font-bold transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <FireCard
                    label="No array"
                    description="Runs after every render"
                    color="rose"
                    fires={renderFires.current}
                    note="Fires on every render: name changes, count changes, anything"
                />
                <FireCard
                    label="Empty []"
                    description="Once on mount"
                    color="emerald"
                    fires={mountFires}
                    note="Fired once when this component first mounted"
                />
                <FireCard
                    label="[count]"
                    description="When count changes"
                    color="indigo"
                    fires={countFires}
                    note="Fires only when count changes — name edits don't trigger it"
                />
            </div>
        </div>
    );
}
