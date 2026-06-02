import { memo } from 'react';
import { ITEMS } from '../utils/data';

export const SlowList = memo(function SlowList({ query }: { query: string }) {
    const start = performance.now();
    while (performance.now() - start < 60) {}

    const filtered = ITEMS.filter(
        (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.tag.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="space-y-1.5">
            <p className="text-[10px] text-zinc-600">
                Showing {filtered.length} / {ITEMS.length} items
            </p>
            <div className="max-h-48 overflow-y-auto slide-scroll space-y-1">
                {filtered.slice(0, 30).map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between bg-zinc-800/40 border border-zinc-800 rounded px-3 py-1.5"
                    >
                        <span className="text-xs text-zinc-300">
                            {item.name}
                        </span>
                        <span className="text-[10px] text-zinc-600">
                            {item.tag}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
});
