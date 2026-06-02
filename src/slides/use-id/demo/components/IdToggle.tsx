export function IdToggle({
    showBroken,
    onToggle,
}: {
    showBroken: boolean;
    onToggle: (broken: boolean) => void;
}) {
    return (
        <div className="flex items-center gap-3 bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3">
            <button
                onClick={() => onToggle(false)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    !showBroken
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-transparent border-zinc-700 text-zinc-400 hover:text-zinc-200'
                }`}
            >
                useId ✅
            </button>
            <button
                onClick={() => onToggle(true)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                    showBroken
                        ? 'bg-rose-600/80 border-rose-500 text-white'
                        : 'bg-transparent border-zinc-700 text-zinc-400 hover:text-zinc-200'
                }`}
            >
                Hard-coded ID ❌
            </button>
        </div>
    );
}
