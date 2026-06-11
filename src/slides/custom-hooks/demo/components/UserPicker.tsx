const USERS = [
    { id: 1, name: 'Leanne' },
    { id: 2, name: 'Ervin' },
    { id: 3, name: 'Clementine' },
    { id: 4, name: 'Patricia' },
];

export function UserPicker({
    active,
    onSelect,
}: {
    active: number;
    onSelect: (id: number) => void;
}) {
    return (
        <div className="flex gap-1.5">
            {USERS.map((u) => (
                <button
                    key={u.id}
                    onClick={() => onSelect(u.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors ${
                        active === u.id
                            ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
                            : 'bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                    {u.name}
                </button>
            ))}
        </div>
    );
}
