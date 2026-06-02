export function ActiveToggle({
    isActive,
    onToggle,
}: {
    isActive: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="flex items-center gap-3">
            <button
                onClick={onToggle}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                    isActive ? 'bg-indigo-600' : 'bg-zinc-700'
                }`}
            >
                <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                        isActive ? 'left-5' : 'left-0.5'
                    }`}
                />
            </button>
            <span className="text-xs text-zinc-400">
                {isActive ? 'Active' : 'Inactive'}
            </span>
        </div>
    );
}
