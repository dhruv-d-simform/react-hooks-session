import { useReducer } from 'react';
import CodeBlock from '@/components/CodeBlock';

interface CartItem {
    id: number;
    name: string;
    price: number;
    qty: number;
}

type CartAction =
    | { type: 'ADD'; item: Omit<CartItem, 'qty'> }
    | { type: 'INCREMENT'; id: number }
    | { type: 'DECREMENT'; id: number }
    | { type: 'REMOVE'; id: number }
    | { type: 'CLEAR' };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
    switch (action.type) {
        case 'ADD': {
            const exists = state.find((i) => i.id === action.item.id);
            if (exists)
                return state.map((i) =>
                    i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
                );
            return [...state, { ...action.item, qty: 1 }];
        }
        case 'INCREMENT':
            return state.map((i) =>
                i.id === action.id ? { ...i, qty: i.qty + 1 } : i
            );
        case 'DECREMENT':
            return state
                .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
                .filter((i) => i.qty > 0);
        case 'REMOVE':
            return state.filter((i) => i.id !== action.id);
        case 'CLEAR':
            return [];
        default:
            return state;
    }
}

const PRODUCTS: Omit<CartItem, 'qty'>[] = [
    { id: 1, name: 'React Hooks Book', price: 29 },
    { id: 2, name: 'TypeScript Course', price: 49 },
    { id: 3, name: 'VS Code Theme', price: 9 },
    { id: 4, name: 'UI Component Kit', price: 79 },
];

function CartDemo() {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

    return (
        <div className="space-y-4">
            {/* Products */}
            <div>
                <p className="text-xs text-zinc-500 mb-2">Products:</p>
                <div className="grid grid-cols-2 gap-2">
                    {PRODUCTS.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => dispatch({ type: 'ADD', item: p })}
                            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg p-3 text-left transition-colors"
                        >
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-indigo-400">
                                ${p.price}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Cart */}
            <div className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-700">
                    <span className="text-xs font-semibold text-zinc-300">
                        Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
                    </span>
                    {cart.length > 0 && (
                        <button
                            onClick={() => dispatch({ type: 'CLEAR' })}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>
                {cart.length === 0 ? (
                    <p className="text-xs text-zinc-600 text-center py-6">
                        Cart is empty
                    </p>
                ) : (
                    <>
                        <ul className="divide-y divide-zinc-700/60">
                            {cart.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-3 px-4 py-2.5"
                                >
                                    <span className="text-sm flex-1">
                                        {item.name}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: 'DECREMENT',
                                                    id: item.id,
                                                })
                                            }
                                            className="w-6 h-6 rounded bg-zinc-700 hover:bg-zinc-600 text-xs font-bold transition-colors"
                                        >
                                            −
                                        </button>
                                        <span className="text-sm font-mono w-5 text-center">
                                            {item.qty}
                                        </span>
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: 'INCREMENT',
                                                    id: item.id,
                                                })
                                            }
                                            className="w-6 h-6 rounded bg-zinc-700 hover:bg-zinc-600 text-xs font-bold transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-xs font-mono text-indigo-300 w-14 text-right">
                                        ${item.price * item.qty}
                                    </span>
                                    <button
                                        onClick={() =>
                                            dispatch({
                                                type: 'REMOVE',
                                                id: item.id,
                                            })
                                        }
                                        className="text-zinc-600 hover:text-red-400 transition-colors text-xs"
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between px-4 py-2.5 border-t border-zinc-700 bg-zinc-900/50">
                            <span className="text-xs font-semibold">Total</span>
                            <span className="text-sm font-black text-indigo-300">
                                ${total}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const code = `type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'> }
  | { type: 'INCREMENT'; id: number }
  | { type: 'DECREMENT'; id: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.item.id)
      if (exists) return state.map(i => i.id === action.item.id
        ? { ...i, qty: i.qty + 1 } : i)
      return [...state, { ...action.item, qty: 1 }]
    }
    case 'INCREMENT':
      return state.map(i => i.id === action.id ? {...i, qty: i.qty+1} : i)
    case 'DECREMENT':
      return state.map(i => i.id === action.id ? {...i, qty: i.qty-1} : i)
               .filter(i => i.qty > 0)
    case 'CLEAR': return []
    default: return state
  }
}

function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, [])

  dispatch({ type: 'ADD', item: { id: 1, name: 'Book', price: 29 } })
  dispatch({ type: 'INCREMENT', id: 1 })
  dispatch({ type: 'CLEAR' })
}`;

export default function Demo() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Live Demo</p>
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
                    <CartDemo />
                </div>
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Source</p>
                <CodeBlock code={code} title="useReducer — Cart" />
            </div>
        </div>
    );
}
