export const SHAKE_KEYFRAMES = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
}
.animate-shake { animation: shake 0.4s ease-in-out; }
`;

export function ParentControls({
    onFocusUser,
    onFocusPass,
    onClearAll,
    onShakeUser,
}: {
    onFocusUser: () => void;
    onFocusPass: () => void;
    onClearAll: () => void;
    onShakeUser: () => void;
}) {
    return (
        <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Parent controls
            </p>
            <div className="grid grid-cols-3 gap-2">
                <button
                    onClick={onFocusUser}
                    className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-[11px] text-amber-300 hover:bg-amber-900/50 transition-colors"
                >
                    Focus User
                </button>
                <button
                    onClick={onFocusPass}
                    className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-[11px] text-amber-300 hover:bg-amber-900/50 transition-colors"
                >
                    Focus Pass
                </button>
                <button
                    onClick={onClearAll}
                    className="py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    Clear All
                </button>
                <button
                    onClick={onShakeUser}
                    className="py-2 rounded-lg bg-rose-900/20 border border-rose-700/30 text-[11px] text-rose-400 hover:bg-rose-900/30 transition-colors col-span-3"
                >
                    Shake Username (validation error)
                </button>
            </div>
        </div>
    );
}
