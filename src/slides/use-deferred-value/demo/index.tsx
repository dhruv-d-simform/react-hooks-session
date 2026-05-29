import { useState, useDeferredValue, memo } from 'react';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-deferred-value/demo/index.tsx';

const ITEMS = Array.from({ length: 3000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    tag: ['React', 'TypeScript', 'CSS', 'Node.js', 'Testing'][i % 5],
}));

const SlowList = memo(function SlowList({ query }: { query: string }) {
    // Simulate slow render
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

export default function Demo() {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center justify-between">
                        <span>Search (try "React" or "Type")</span>
                        <span className="normal-case font-normal text-zinc-600">
                            Input:{' '}
                            <span className="font-mono text-indigo-300">
                                "{query}"
                            </span>{' '}
                            • Deferred:{' '}
                            <span className="font-mono text-emerald-300">
                                "{deferredQuery}"
                            </span>
                        </span>
                    </label>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type to filter…"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-600"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <div
                        className={`w-2 h-2 rounded-full transition-colors ${isStale ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}
                    />
                    <span className="text-[11px] text-zinc-500">
                        {isStale
                            ? 'List is catching up to input…'
                            : 'List is in sync'}
                    </span>
                </div>

                <div
                    className={`transition-opacity duration-150 ${isStale ? 'opacity-50' : 'opacity-100'}`}
                >
                    <SlowList query={deferredQuery} />
                </div>

                <div className="bg-emerald-900/15 border border-emerald-700/25 rounded-lg p-3">
                    <p className="text-[11px] text-emerald-400/80 leading-relaxed">
                        ✅ The input stays immediately responsive — the list
                        renders in the background with the deferred value. Stale
                        results show at 50% opacity.
                    </p>
                </div>
            </div>
        </div>
    );
}
