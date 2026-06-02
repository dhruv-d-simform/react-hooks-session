import { useState, useMemo, useRef } from 'react';
import StatusBanner from '@/components/demo/StatusBanner';
import { FilterInputs } from './components/FilterInputs';
import { ResultsStats } from './components/ResultsStats';
import { ResultsList } from './components/ResultsList';
import { ITEMS, expensiveFilter } from './utils/data';

export default function FilterDemo({ memoized }: { memoized: boolean }) {
    const [query, setQuery] = useState('');
    const [name, setName] = useState('');
    const computeCount = useRef(0);

    const filtered = memoized
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          useMemo(() => {
              computeCount.current++;
              return expensiveFilter(ITEMS, query);
          }, [query])
        : (() => {
              computeCount.current++;
              return expensiveFilter(ITEMS, query);
          })();

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={memoized}
                onMessage="✅ useMemo([query]) — compute only when query changes"
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
                memoized={memoized}
            />
            <ResultsList items={filtered} />
        </div>
    );
}
