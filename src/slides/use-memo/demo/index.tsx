import { useState } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import FilterDemo from './FilterDemo';

export const fileUrl = '/src/slides/use-memo/demo/index.tsx';

type Tab = 'with' | 'without';

const TAB_LABELS: Record<Tab, string> = {
    without: 'Without useMemo ❌',
    with: 'With useMemo ✅',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('without');

    return (
        <DemoShell fileUrl={fileUrl}>
            <TabBar
                tabs={TAB_LABELS}
                active={activeTab}
                onSelect={(v) => setActiveTab(v as Tab)}
            />
            <FilterDemo key={activeTab} memoized={activeTab === 'with'} />
        </DemoShell>
    );
}
