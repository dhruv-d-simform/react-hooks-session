import { useState, useDeferredValue } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { SlowList } from './components/SlowList';

export const fileUrl = '/src/slides/use-deferred-value/demo/index.tsx';

export default function Demo() {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;

    return (
        <DemoShell fileUrl={fileUrl}>
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

            <InfoNote color="emerald">
                ✅ The input stays immediately responsive — the list renders in
                the background with the deferred value. Stale results show at 50%
                opacity.
            </InfoNote>
        </DemoShell>
    );
}
