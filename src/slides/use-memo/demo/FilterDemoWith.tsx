/* eslint-disable react-hooks/refs */
import { useState, useMemo, useRef } from 'react';
import StatusBanner from '@/components/demo/StatusBanner';
import { FilterInputs } from './components/FilterInputs';
import { ResultsStats } from './components/ResultsStats';
import { ResultsList } from './components/ResultsList';
import { ITEMS, expensiveFilter } from './utils/data';

export const fileUrl = '/src/slides/use-memo/demo/FilterDemoWith.tsx';

export default function FilterDemoWith() {
    const [query, setQuery] = useState('');
    const [name, setName] = useState('');
    const computeCount = useRef(0);

    const filtered = useMemo(() => {
        computeCount.current++;
        return expensiveFilter(ITEMS, query);
    }, [query]);

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={true}
                onMessage="✅ useMemo([query]) — compute only when query changes"
                offMessage=""
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
                memoized={true}
            />
            <ResultsList items={filtered} />
        </div>
    );
}
