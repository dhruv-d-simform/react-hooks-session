/* eslint-disable react-hooks/purity -- deliberate busy-wait to simulate a slow render */
import { memo } from 'react';
import { ITEMS, filterItems } from '../utils/data';

function SlowRow({ name, tag }: { name: string; tag: string }) {
    // Each row burns ~0.4ms — slow per component so concurrent
    // rendering can yield between rows during a deferred render.
    const start = performance.now();
    while (performance.now() - start < 0.4);

    return (
        <div className="flex items-center justify-between bg-zinc-800/40 border border-zinc-800 rounded px-3 py-1.5">
            <span className="text-xs text-zinc-300">{name}</span>
            <span className="text-[10px] text-zinc-600">{tag}</span>
        </div>
    );
}

// memo is essential: when only the urgent `query` changes (input keystroke)
// but the deferred value hasn't, React can skip re-rendering this list.
export const SlowResults = memo(function SlowResults({
    query,
}: {
    query: string;
}) {
    const filtered = filterItems(query);

    return (
        <div className="space-y-1.5">
            <p className="text-[10px] text-zinc-600">
                Showing {Math.min(filtered.length, 250)} of {filtered.length}{' '}
                matches ({ITEMS.length} items total) — each row renders
                artificially slow
            </p>
            <div className="max-h-44 overflow-y-auto slide-scroll space-y-1">
                {filtered.slice(0, 250).map((item) => (
                    <SlowRow key={item.id} name={item.name} tag={item.tag} />
                ))}
            </div>
        </div>
    );
});
