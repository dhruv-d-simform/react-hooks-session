import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import FilterDemoWithout, { fileUrl as withoutUrl } from './FilterDemoWithout';
import FilterDemoWith, { fileUrl as withUrl } from './FilterDemoWith';

type Tab = 'without' | 'with';

const TAB_LABELS: Record<Tab, string> = {
    without: 'Without useMemo ❌',
    with: 'With useMemo ✅',
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
                <FilterDemoWithout key="without" />
            ) : (
                <FilterDemoWith key="with" />
            )}
        </TabDemoShell>
    );
}
