export function ViewToggle({
    view,
    onSelect,
}: {
    view: 'before' | 'after';
    onSelect: (v: 'before' | 'after') => void;
}) {
    return (
        <div className="flex items-center gap-1 bg-zinc-800 p-1 rounded-lg">
            {(['before', 'after'] as const).map((v) => (
                <button
                    key={v}
                    onClick={() => onSelect(v)}
                    className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-colors ${
                        view === v
                            ? v === 'before'
                                ? 'bg-amber-600/80 text-white'
                                : 'bg-teal-600 text-white'
                            : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                    {v === 'before' ? 'Before · inline logic' : 'After · useFetch'}
                </button>
            ))}
        </div>
    );
}
