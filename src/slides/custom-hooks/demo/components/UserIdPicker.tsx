export function UserIdPicker({
    active,
    onSelect,
}: {
    active: number;
    onSelect: (id: number) => void;
}) {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                Live · powered by useFetch
            </span>
            {[1, 2, 3, 4, 5].map((id) => (
                <button
                    key={id}
                    onClick={() => onSelect(id)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                        active === id
                            ? 'bg-teal-600 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700'
                    }`}
                >
                    {id}
                </button>
            ))}
        </div>
    );
}
