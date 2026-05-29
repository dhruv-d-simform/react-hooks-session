import { useState, useEffect, useRef } from 'react';

export const fileUrl = '/src/slides/custom-hooks/demo/ComposedSearch.tsx';

/** Primitive hook: returns `value` only after it stops changing for `delay` ms. */
function useDebounce<T>(value: T, delay: number) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

const CATALOG = [
    'useState',
    'useEffect',
    'useReducer',
    'useContext',
    'useRef',
    'useMemo',
    'useCallback',
    'useTransition',
    'useDeferredValue',
    'useId',
    'useSyncExternalStore',
    'useOptimistic',
    'useActionState',
];

/**
 * Higher-level hook composed FROM useDebounce. Custom hooks calling custom
 * hooks is the composition built-ins alone can't express — this is the payoff.
 */
function useDebouncedSearch(query: string, delay: number) {
    const debouncedQuery = useDebounce(query, delay);
    const [results, setResults] = useState<string[]>(CATALOG);
    const [isSearching, setIsSearching] = useState(false);
    const searchCount = useRef(0);

    useEffect(() => {
        setIsSearching(true);
        // Simulate an async lookup so the debounce is observable.
        const id = setTimeout(() => {
            const q = debouncedQuery.trim().toLowerCase();
            setResults(
                q ? CATALOG.filter((h) => h.toLowerCase().includes(q)) : CATALOG
            );
            searchCount.current++;
            setIsSearching(false);
        }, 250);
        return () => clearTimeout(id);
    }, [debouncedQuery]);

    return { results, isSearching, searchCount: searchCount.current };
}

export default function ComposedSearch() {
    const [query, setQuery] = useState('');
    const { results, isSearching, searchCount } = useDebouncedSearch(
        query,
        400
    );

    return (
        <div className="space-y-4">
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5 font-mono text-[11px] leading-relaxed">
                <span className="text-yellow-400">useDebouncedSearch</span>
                <span className="text-zinc-500"> ──calls──&gt; </span>
                <span className="text-yellow-400">useDebounce</span>
                <span className="text-zinc-500"> + </span>
                <span className="text-yellow-400">useState</span>
                <span className="text-zinc-500"> / </span>
                <span className="text-yellow-400">useEffect</span>
            </div>

            <div className="relative">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search hooks… (try 'use', 'ref', 'mo')"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-teal-500 transition-colors"
                />
                {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                )}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>
                    keystrokes don&rsquo;t fire searches — debounced searches
                    run: <span className="text-teal-400">{searchCount}</span>
                </span>
                <span className="bg-zinc-800 px-2 py-0.5 rounded-full">
                    {results.length} match{results.length === 1 ? '' : 'es'}
                </span>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
                {results.length === 0 ? (
                    <span className="text-xs text-zinc-600 italic">
                        no hooks match &ldquo;{query}&rdquo;
                    </span>
                ) : (
                    results.map((h) => (
                        <span
                            key={h}
                            className="text-[11px] font-mono px-2 py-1 rounded-md border bg-teal-500/10 text-teal-200 border-teal-500/30"
                        >
                            {h}
                        </span>
                    ))
                )}
            </div>

            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-2.5">
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                    ⚡ Type fast: the search only runs 400ms after you stop. The
                    debounce logic is reused, not re-written — and the consumer
                    never sees a timer.
                </p>
            </div>
        </div>
    );
}
