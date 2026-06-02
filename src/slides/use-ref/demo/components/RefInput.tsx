export function RefInput({
    label,
    placeholder,
    ref,
}: {
    label: string;
    placeholder: string;
    ref: React.Ref<HTMLInputElement>;
}) {
    return (
        <div>
            <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">
                {label}
            </label>
            <input
                ref={ref}
                placeholder={placeholder}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600"
            />
        </div>
    );
}
