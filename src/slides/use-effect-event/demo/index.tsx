import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import ProblemDemo, { fileUrl as problemUrl } from './ProblemDemo';
import WorkaroundDemo, { fileUrl as workaroundUrl } from './WorkaroundDemo';
import UseEffectEventDemo, {
    fileUrl as effectEventUrl,
} from './UseEffectEventDemo';

type Tab = 'problem' | 'workaround' | 'useEffectEvent';

const TAB_LABELS: Record<Tab, string> = {
    problem: 'Problem',
    workaround: 'Ref Workaround',
    useEffectEvent: 'useEffectEvent',
};

const FILE_URLS: Record<Tab, string> = {
    problem: problemUrl,
    workaround: workaroundUrl,
    useEffectEvent: effectEventUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('problem');

    return (
        <TabDemoShell
            tabs={TAB_LABELS}
            fileUrls={FILE_URLS}
            activeTab={activeTab}
            onTabChange={(v) => setActiveTab(v as Tab)}
        >
            {activeTab === 'problem' && <ProblemDemo />}
            {activeTab === 'workaround' && <WorkaroundDemo />}
            {activeTab === 'useEffectEvent' && <UseEffectEventDemo />}
        </TabDemoShell>
    );
}
