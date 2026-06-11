import { useState } from 'react';
import StatusBanner from '@/components/demo/StatusBanner';
import { SearchInput } from './components/SearchInput';
import { SlowResults } from './components/SlowResults';

export const fileUrl =
    '/src/slides/use-deferred-value/demo/SearchDemoWithout.tsx';

export default function SearchDemoWithout() {
    const [query, setQuery] = useState('');

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={false}
                onMessage=""
                offMessage="❌ The slow list renders with `query` directly — every keystroke must wait for 250 slow rows to re-render. Type fast and watch the letters stutter."
            />
            <SearchInput
                value={query}
                renderedValue={query}
                onChange={setQuery}
            />
            <SlowResults query={query} />
        </div>
    );
}
