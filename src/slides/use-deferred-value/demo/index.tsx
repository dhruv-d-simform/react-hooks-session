import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import SearchDemoWithout, { fileUrl as withoutUrl } from './SearchDemoWithout';
import SearchDemoWith, { fileUrl as withUrl } from './SearchDemoWith';

type Tab = 'without' | 'with';

const TAB_LABELS: Record<Tab, string> = {
    without: 'Without useDeferredValue ❌',
    with: 'With useDeferredValue ✅',
};

const FILE_URLS: Record<Tab, string> = {
    without: withoutUrl,
    with: withUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('without');

    return (
        <TabDemoShell
            tabs={TAB_LABELS}
            fileUrls={FILE_URLS}
            activeTab={activeTab}
            onTabChange={(v) => setActiveTab(v as Tab)}
        >
            {activeTab === 'without' ? (
                <SearchDemoWithout key="without" />
            ) : (
                <SearchDemoWith key="with" />
            )}
        </TabDemoShell>
    );
}
