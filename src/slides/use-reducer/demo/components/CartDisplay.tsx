import type { CartItem } from '../reducer';

export function CartDisplay({
    items,
    total,
    onRemove,
    onClear,
}: {
    items: CartItem[];
    total: number;
    onRemove: (id: number) => void;
    onClear: () => void;
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Cart{' '}
                    {items.length > 0 && (
                        <span className="text-indigo-400">
                            ({items.length})
                        </span>
                    )}
                </p>
                {items.length > 0 && (
                    <button
                        onClick={onClear}
                        className="text-[10px] text-rose-400 hover:text-rose-300 transition-colors"
                    >
                        Clear cart
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <p className="text-xs text-zinc-600 text-center py-4">
                    Cart is empty — add something from the menu
                </p>
            ) : (
                <div className="space-y-2">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2"
                        >
                            <div className="flex items-center gap-2">
                                <span>{item.emoji}</span>
                                <span className="text-xs text-zinc-300">
                                    {item.name}
                                </span>
                                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-900/30 px-1.5 py-0.5 rounded-full">
                                    ×{item.qty}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-zinc-400">
                                    ${(item.price * item.qty).toFixed(2)}
                                </span>
                                <button
                                    onClick={() => onRemove(item.id)}
                                    className="text-zinc-600 hover:text-rose-400 text-xs transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                        <span className="text-xs text-zinc-500">Total</span>
                        <span className="text-sm font-bold text-zinc-100 font-mono">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
