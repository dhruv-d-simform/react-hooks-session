import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import CardBuilder, { fileUrl as cardUrl } from './CardBuilder';
import FunctionalUpdate, { fileUrl as updateUrl } from './FunctionalUpdate';

type Tab = 'builder' | 'functional';

const TAB_LABELS: Record<Tab, string> = {
    builder: 'Card Builder',
    functional: 'Functional Update',
};

const FILE_URLS: Record<Tab, string> = {
    builder: cardUrl,
    functional: updateUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('builder');

    return (
        <TabDemoShell
            tabs={TAB_LABELS}
            fileUrls={FILE_URLS}
            activeTab={activeTab}
            onTabChange={(v) => setActiveTab(v as Tab)}
        >
            {activeTab === 'builder' ? <CardBuilder /> : <FunctionalUpdate />}
        </TabDemoShell>
    );
}
