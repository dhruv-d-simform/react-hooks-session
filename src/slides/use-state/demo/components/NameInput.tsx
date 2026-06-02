export function NameInput({
    value,
    onChange,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                Name
            </label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-indigo-500 transition-colors"
            />
        </div>
    );
}
