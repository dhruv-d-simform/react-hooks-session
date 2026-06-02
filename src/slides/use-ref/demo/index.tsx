import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import DomRef, { fileUrl as domUrl } from './DomRef';
import MutableValue, { fileUrl as mutableUrl } from './MutableValue';

type Tab = 'dom' | 'mutable';

const TAB_LABELS: Record<Tab, string> = {
    dom: 'DOM Ref',
    mutable: 'Mutable Value',
};

const FILE_URLS: Record<Tab, string> = {
    dom: domUrl,
    mutable: mutableUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('dom');

    return (
        <TabDemoShell
            tabs={TAB_LABELS}
            fileUrls={FILE_URLS}
            activeTab={activeTab}
            onTabChange={(v) => setActiveTab(v as Tab)}
        >
            {activeTab === 'dom' ? <DomRef /> : <MutableValue />}
        </TabDemoShell>
    );
}
