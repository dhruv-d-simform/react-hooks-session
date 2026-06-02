export function ResultsList({
    items,
}: {
    items: { id: number; name: string; category: string }[];
}) {
    return (
        <div className="bg-zinc-800/40 rounded-lg overflow-hidden max-h-36 overflow-y-auto slide-scroll">
            {items.slice(0, 20).map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-800/50 last:border-0"
                >
                    <span className="text-xs text-zinc-300">{item.name}</span>
                    <span className="text-[10px] text-zinc-600">
                        {item.category}
                    </span>
                </div>
            ))}
        </div>
    );
}
