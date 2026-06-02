import { useState } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import TodoList from './TodoList';

export const fileUrl = '/src/slides/use-callback/demo/index.tsx';

type Tab = 'with' | 'without';

const TAB_LABELS: Record<Tab, string> = {
    with: 'With useCallback ✅',
    without: 'Without useCallback ❌',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('with');

    return (
        <DemoShell fileUrl={fileUrl}>
            <TabBar
                tabs={TAB_LABELS}
                active={activeTab}
                onSelect={(v) => setActiveTab(v as Tab)}
            />
            <TodoList
                key={activeTab}
                useCallbackEnabled={activeTab === 'with'}
            />
        </DemoShell>
    );
}
