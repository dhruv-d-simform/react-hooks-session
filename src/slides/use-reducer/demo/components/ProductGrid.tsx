import type { Product } from '../reducer';

export function ProductGrid({
    products,
    onAdd,
}: {
    products: Product[];
    onAdd: (p: Product) => void;
}) {
    return (
        <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5">
                Menu
            </p>
            <div className="grid grid-cols-2 gap-2">
                {products.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => onAdd(p)}
                        className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl p-3 text-left transition-colors"
                    >
                        <span className="text-2xl block mb-1">{p.emoji}</span>
                        <span className="text-xs font-medium text-zinc-200 block">
                            {p.name}
                        </span>
                        <span className="text-[11px] text-zinc-500">
                            ${p.price.toFixed(2)}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
