import { useReducer } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
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
            <InfoNote color="zinc">
                <span className="font-bold uppercase tracking-widest text-[10px] block mb-1">
                    Dispatch an action
                </span>
                Click the buttons below —{' '}
                <span className="font-mono text-emerald-400">dispatch</span>{' '}
                tells the reducer what happened, not what to do.
            </InfoNote>

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
