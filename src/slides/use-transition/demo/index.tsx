import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import TabsDemoWithout, { fileUrl as withoutUrl } from './TabsDemoWithout';
import TabsDemoWith, { fileUrl as withUrl } from './TabsDemoWith';

type Tab = 'without' | 'with';

const TAB_LABELS: Record<Tab, string> = {
    without: 'Without useTransition ❌',
    with: 'With useTransition ✅',
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
                <TabsDemoWithout key="without" />
            ) : (
                <TabsDemoWith key="with" />
            )}
        </TabDemoShell>
    );
}
