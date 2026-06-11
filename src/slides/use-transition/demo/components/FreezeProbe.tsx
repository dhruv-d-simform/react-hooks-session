import { useState } from 'react';

export function FreezeProbe() {
    const [clicks, setClicks] = useState(0);

    return (
        <div className="flex items-center justify-between bg-zinc-800/40 border border-zinc-700/40 rounded-lg px-3 py-2">
            <p className="text-[11px] text-zinc-500">
                Is the UI frozen? Keep clicking while a tab loads →
            </p>
            <button
                onClick={() => setClicks((c) => c + 1)}
                className="text-xs bg-zinc-700 hover:bg-zinc-600 active:scale-95 transition-all text-zinc-200 rounded-md px-3 py-1.5 font-medium"
            >
                Clicked {clicks}×
            </button>
        </div>
    );
}
