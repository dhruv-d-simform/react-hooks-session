import { useState, useMemo, useRef } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import StatusBanner from '@/components/demo/StatusBanner';
import { FilterInputs } from './components/FilterInputs';
import { ResultsStats } from './components/ResultsStats';
import { ResultsList } from './components/ResultsList';
import { ITEMS, expensiveFilter } from './utils/data';

export const fileUrl = '/src/slides/use-memo/demo/index.tsx';

type Tab = 'with' | 'without';

const TAB_LABELS: Record<Tab, string> = {
    with: 'With useMemo ✅',
    without: 'Without useMemo ❌',
};

function FilterDemo({ memoized }: { memoized: boolean }) {
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

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('with');

    return (
        <DemoShell fileUrl={fileUrl}>
            <TabBar
                tabs={TAB_LABELS}
                active={activeTab}
                onSelect={(v) => setActiveTab(v as Tab)}
            />
            <FilterDemo key={activeTab} memoized={activeTab === 'with'} />
        </DemoShell>
    );
}
