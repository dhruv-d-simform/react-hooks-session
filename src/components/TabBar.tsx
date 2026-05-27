interface Props {
    tabs: Record<string, string>;
    active: string;
    onSelect: (value: string) => void;
}

export default function TabBar({ tabs, active, onSelect }: Props) {
    return (
        <div className="flex gap-1 bg-zinc-800 p-1 rounded-lg">
            {Object.entries(tabs).map(([value, label]) => (
                <button
                    key={value}
                    onClick={() => onSelect(value)}
                    className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-colors ${
                        active === value
                            ? 'bg-indigo-600 text-white'
                            : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
