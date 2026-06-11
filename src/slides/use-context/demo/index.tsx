import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import WithContext, { fileUrl as contextUrl } from './WithContext';
import PropDrilling, { fileUrl as drillingUrl } from './PropDrilling';

type Tab = 'context' | 'drilling';

const TAB_LABELS: Record<Tab, string> = {
    drilling: 'Prop Drilling',
    context: 'useContext',
};

const FILE_URLS: Record<Tab, string> = {
    drilling: drillingUrl,
    context: contextUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('drilling');

    return (
        <TabDemoShell
            tabs={TAB_LABELS}
            fileUrls={FILE_URLS}
            activeTab={activeTab}
            onTabChange={(v) => setActiveTab(v as Tab)}
        >
            {activeTab === 'context' ? <WithContext /> : <PropDrilling />}
        </TabDemoShell>
    );
}
