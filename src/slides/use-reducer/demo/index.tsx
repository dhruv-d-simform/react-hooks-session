import { useReducer } from 'react';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-reducer/demo/index.tsx';

type Product = { id: number; name: string; emoji: string; price: number };

type CartItem = Product & { qty: number };

type State = { items: CartItem[] };

type Action =
    | { type: 'ADD'; product: Product }
    | { type: 'REMOVE'; id: number }
    | { type: 'CLEAR' };

const PRODUCTS: Product[] = [
    { id: 1, name: 'Coffee', emoji: '☕', price: 3.5 },
    { id: 2, name: 'Croissant', emoji: '🥐', price: 2.75 },
    { id: 3, name: 'Cheesecake', emoji: '🍰', price: 4.0 },
    { id: 4, name: 'Green Tea', emoji: '🍵', price: 2.5 },
];

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD': {
            const existing = state.items.find(
                (i) => i.id === action.product.id
            );
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === action.product.id
                            ? { ...i, qty: i.qty + 1 }
                            : i
                    ),
                };
            }
            return {
                items: [...state.items, { ...action.product, qty: 1 }],
            };
        }
        case 'REMOVE':
            return { items: state.items.filter((i) => i.id !== action.id) };
        case 'CLEAR':
            return { items: [] };
    }
}

export default function Demo() {
    const [state, dispatch] = useReducer(reducer, { items: [] });

    const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-5">
                {/* Last dispatched action display */}
                <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">
                        Dispatch an action
                    </p>
                    <p className="text-xs text-zinc-500">
                        Click the buttons below —{' '}
                        <span className="font-mono text-emerald-400">
                            dispatch
                        </span>{' '}
                        tells the reducer what happened, not what to do.
                    </p>
                </div>

                {/* Product grid */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5">
                        Menu
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {PRODUCTS.map((p) => (
                            <button
                                key={p.id}
                                onClick={() =>
                                    dispatch({ type: 'ADD', product: p })
                                }
                                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl p-3 text-left transition-colors group"
                            >
                                <span className="text-2xl block mb-1">
                                    {p.emoji}
                                </span>
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

                {/* Cart */}
                <div>
                    <div className="flex items-center justify-between mb-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Cart{' '}
                            {state.items.length > 0 && (
                                <span className="text-indigo-400">
                                    ({state.items.length})
                                </span>
                            )}
                        </p>
                        {state.items.length > 0 && (
                            <button
                                onClick={() => dispatch({ type: 'CLEAR' })}
                                className="text-[10px] text-rose-400 hover:text-rose-300 transition-colors"
                            >
                                Clear cart
                            </button>
                        )}
                    </div>

                    {state.items.length === 0 ? (
                        <p className="text-xs text-zinc-600 text-center py-4">
                            Cart is empty — add something from the menu
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {state.items.map((item) => (
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
                                            $
                                            {(item.price * item.qty).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: 'REMOVE',
                                                    id: item.id,
                                                })
                                            }
                                            className="text-zinc-600 hover:text-rose-400 text-xs transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                                <span className="text-xs text-zinc-500">
                                    Total
                                </span>
                                <span className="text-sm font-bold text-zinc-100 font-mono">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
