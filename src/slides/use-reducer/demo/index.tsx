import { useReducer } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import { reducer } from './reducer';
import { PRODUCTS } from './utils/data';
import { ProductGrid } from './components/ProductGrid';
import { CartDisplay } from './components/CartDisplay';

export const fileUrl = '/src/slides/use-reducer/demo/index.tsx';

export default function Demo() {
    const [state, dispatch] = useReducer(reducer, { items: [] });

    const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <DemoShell fileUrl={fileUrl}>
            <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">
                    Dispatch an action
                </p>
                <p className="text-xs text-zinc-500">
                    Click the buttons below —{' '}
                    <span className="font-mono text-emerald-400">dispatch</span>{' '}
                    tells the reducer what happened, not what to do.
                </p>
            </div>

            <ProductGrid
                products={PRODUCTS}
                onAdd={(p) => dispatch({ type: 'ADD', product: p })}
            />

            <CartDisplay
                items={state.items}
                total={total}
                onRemove={(id) => dispatch({ type: 'REMOVE', id })}
                onClear={() => dispatch({ type: 'CLEAR' })}
            />
        </DemoShell>
    );
}
