import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import { StatusNote } from './components/StatusNote';
import TooltipDemoEffect from './TooltipDemoEffect';
import TooltipDemoLayout from './TooltipDemoLayout';

type Tab = 'effect' | 'layout';

const TAB_LABELS: Record<Tab, string> = {
    effect: 'useEffect ⚠️',
    layout: 'useLayoutEffect ✅',
};

const FILE_URLS: Record<Tab, string> = {
    effect: '/src/slides/use-layout-effect/demo/TooltipDemoEffect.tsx',
    layout: '/src/slides/use-layout-effect/demo/TooltipDemoLayout.tsx',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('effect');

    return (
        <TabDemoShell
            tabs={TAB_LABELS}
            fileUrls={FILE_URLS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'effect' ? (
                <TooltipDemoEffect key="effect" />
            ) : (
                <TooltipDemoLayout key="layout" />
            )}
            <StatusNote variant={activeTab} />
        </TabDemoShell>
    );
}
