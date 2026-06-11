import { useState, useDeferredValue } from 'react';
import StatusBanner from '@/components/demo/StatusBanner';
import { SearchInput } from './components/SearchInput';
import { SlowResults } from './components/SlowResults';

export const fileUrl = '/src/slides/use-deferred-value/demo/SearchDemoWith.tsx';

export default function SearchDemoWith() {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={true}
                onMessage="✅ The list renders with deferredQuery — keystrokes update the input instantly, while the slow list catches up in the background (stale results dim to 50%)."
                offMessage=""
            />
            <SearchInput
                value={query}
                renderedValue={deferredQuery}
                onChange={setQuery}
            />
            <div
                className={`transition-opacity duration-150 ${isStale ? 'opacity-50' : 'opacity-100'}`}
            >
                <SlowResults query={deferredQuery} />
            </div>
        </div>
    );
}
