import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import TodoListWithout, { fileUrl as withoutUrl } from './TodoListWithout';
import TodoListWith, { fileUrl as withUrl } from './TodoListWith';

type Tab = 'without' | 'with';

const TAB_LABELS: Record<Tab, string> = {
    without: 'Without useCallback ❌',
    with: 'With useCallback ✅',
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
                <TodoListWithout key="without" />
            ) : (
                <TodoListWith key="with" />
            )}
        </TabDemoShell>
    );
}
