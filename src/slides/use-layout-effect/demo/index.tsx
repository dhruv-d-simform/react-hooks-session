import { useState } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import { StatusNote } from './components/StatusNote';
import TooltipDemo from './TooltipDemo';

export const fileUrl = '/src/slides/use-layout-effect/demo/index.tsx';

type Tab = 'layout' | 'effect';

const TAB_LABELS: Record<Tab, string> = {
    effect: 'useEffect ⚠️',
    layout: 'useLayoutEffect ✅',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('effect');

    return (
        <DemoShell fileUrl={fileUrl}>
            <TabBar
                tabs={TAB_LABELS}
                active={activeTab}
                onSelect={(v) => setActiveTab(v as Tab)}
            />
            <TooltipDemo key={activeTab} useLayout={activeTab === 'layout'} />
            <StatusNote useLayout={activeTab === 'layout'} />
        </DemoShell>
    );
}
