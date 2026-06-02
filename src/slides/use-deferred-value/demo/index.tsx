import { useState, useDeferredValue } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { SlowList } from './components/SlowList';
import { DeferredSearchInput } from './components/DeferredSearchInput';
import { SyncStatusDot } from './components/SyncStatusDot';

export const fileUrl = '/src/slides/use-deferred-value/demo/index.tsx';

export default function Demo() {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;

    return (
        <DemoShell fileUrl={fileUrl}>
            <DeferredSearchInput
                query={query}
                deferredQuery={deferredQuery}
                onChange={setQuery}
            />

            <SyncStatusDot isStale={isStale} />

            <div
                className={`transition-opacity duration-150 ${isStale ? 'opacity-50' : 'opacity-100'}`}
            >
                <SlowList query={deferredQuery} />
            </div>

            <InfoNote color="emerald">
                ✅ The input stays immediately responsive — the list renders in
                the background with the deferred value. Stale results show at
                50% opacity.
            </InfoNote>
        </DemoShell>
    );
}
