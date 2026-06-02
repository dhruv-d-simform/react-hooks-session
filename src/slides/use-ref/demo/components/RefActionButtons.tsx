export function RefActionButtons({
    onFocusName,
    onFocusEmail,
    onSelectName,
    onClearName,
}: {
    onFocusName: () => void;
    onFocusEmail: () => void;
    onSelectName: () => void;
    onClearName: () => void;
}) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <button
                onClick={onFocusName}
                className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-xs text-amber-300 hover:bg-amber-900/50 transition-colors"
            >
                Focus Name
            </button>
            <button
                onClick={onFocusEmail}
                className="py-2 rounded-lg bg-amber-900/30 border border-amber-700/40 text-xs text-amber-300 hover:bg-amber-900/50 transition-colors"
            >
                Focus Email
            </button>
            <button
                onClick={onSelectName}
                className="py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
                Select Name
            </button>
            <button
                onClick={onClearName}
                className="py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
                Clear Name
            </button>
        </div>
    );
}
