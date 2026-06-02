import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import DataFetching, { fileUrl as fetchUrl } from './DataFetching';
import DepsExplorer, { fileUrl as depsUrl } from './DepsExplorer';

type Tab = 'fetch' | 'deps';

const TAB_LABELS: Record<Tab, string> = {
    fetch: 'Data Fetching',
    deps: 'Deps Explorer',
};

const FILE_URLS: Record<Tab, string> = {
    fetch: fetchUrl,
    deps: depsUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('fetch');

    return (
        <TabDemoShell
            tabs={TAB_LABELS}
            fileUrls={FILE_URLS}
            activeTab={activeTab}
            onTabChange={(v) => setActiveTab(v as Tab)}
        >
            {activeTab === 'fetch' ? <DataFetching /> : <DepsExplorer />}
        </TabDemoShell>
    );
}
