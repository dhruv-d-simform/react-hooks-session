import { useState, useRef } from 'react';
import StatusBanner from '@/components/demo/StatusBanner';
import { FilterInputs } from './components/FilterInputs';
import { ResultsStats } from './components/ResultsStats';
import { ResultsList } from './components/ResultsList';
import { ITEMS, expensiveFilter } from './utils/data';

export const fileUrl = '/src/slides/use-memo/demo/FilterDemoWithout.tsx';

export default function FilterDemoWithout() {
    const [query, setQuery] = useState('');
    const [name, setName] = useState('');
    const computeCount = useRef(0);

    computeCount.current++;
    const filtered = expensiveFilter(ITEMS, query);

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={false}
                onMessage=""
                offMessage="❌ No memo — recomputes on every render, including unrelated state changes"
            />
            <FilterInputs
                query={query}
                name={name}
                onQueryChange={setQuery}
                onNameChange={setName}
            />
            <ResultsStats
                count={filtered.length}
                total={ITEMS.length}
                computations={computeCount.current}
                memoized={false}
            />
            <ResultsList items={filtered} />
        </div>
    );
}
