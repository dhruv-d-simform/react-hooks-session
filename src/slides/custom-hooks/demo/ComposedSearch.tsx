import { useState, useEffect, useRef } from 'react';
import InfoNote from '@/components/demo/InfoNote';
import { SearchInput } from './components/SearchInput';
import { SearchStats } from './components/SearchStats';
import { ResultChips } from './components/ResultChips';

export const fileUrl = '/src/slides/custom-hooks/demo/ComposedSearch.tsx';

function useDebounce<T>(value: T, delay: number) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

const CATALOG = [
    'useState', 'useEffect', 'useReducer', 'useContext', 'useRef',
    'useMemo', 'useCallback', 'useTransition', 'useDeferredValue',
    'useId', 'useSyncExternalStore', 'useOptimistic', 'useActionState',
];

function useDebouncedSearch(query: string, delay: number) {
    const debouncedQuery = useDebounce(query, delay);
    const [results, setResults] = useState<string[]>(CATALOG);
    const [isSearching, setIsSearching] = useState(false);
    const searchCount = useRef(0);

    useEffect(() => {
        setIsSearching(true);
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
    const { results, isSearching, searchCount } = useDebouncedSearch(query, 400);

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

            <SearchInput
                value={query}
                isSearching={isSearching}
                onChange={setQuery}
            />
            <SearchStats searchCount={searchCount} resultCount={results.length} />
            <ResultChips results={results} query={query} />

            <InfoNote color="zinc">
                ⚡ Type fast: the search only runs 400ms after you stop. The
                debounce logic is reused, not re-written — and the consumer never
                sees a timer.
            </InfoNote>
        </div>
    );
}
