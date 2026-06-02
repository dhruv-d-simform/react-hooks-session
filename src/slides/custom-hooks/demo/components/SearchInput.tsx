export function SearchInput({
    value,
    isSearching,
    onChange,
}: {
    value: string;
    isSearching: boolean;
    onChange: (v: string) => void;
}) {
    return (
        <div className="relative">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search hooks… (try 'use', 'ref', 'mo')"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-teal-500 transition-colors"
            />
            {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
            )}
        </div>
    );
}
