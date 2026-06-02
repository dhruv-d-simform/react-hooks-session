import { useRef } from 'react';

export function TodoItem({
    text,
    onRemove,
    instanceId,
}: {
    text: string;
    onRemove: () => void;
    instanceId: string;
}) {
    const renderCount = useRef(0);
    renderCount.current++;

    return (
        <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-300">{text}</span>
                <span className="text-[9px] font-mono text-zinc-600">
                    ({instanceId})
                </span>
            </div>
            <div className="flex items-center gap-2">
                <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${
                        renderCount.current > 1
                            ? 'text-rose-400 bg-rose-900/30 border-rose-700/30'
                            : 'text-emerald-400 bg-emerald-900/30 border-emerald-700/30'
                    }`}
                >
                    ×{renderCount.current}
                </span>
                <button
                    onClick={onRemove}
                    className="text-zinc-600 hover:text-rose-400 text-xs transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
