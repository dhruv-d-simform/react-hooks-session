import { useState } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import ProblemDemo from './ProblemDemo';
import WorkaroundDemo from './WorkaroundDemo';

export const fileUrl = '/src/slides/use-effect-event/demo/index.tsx';

type Tab = 'problem' | 'workaround';

const TAB_LABELS: Record<Tab, string> = {
    problem: 'Problem',
    workaround: 'Ref Workaround',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('problem');

    return (
        <DemoShell fileUrl={fileUrl}>
            <TabBar
                tabs={TAB_LABELS}
                active={activeTab}
                onSelect={(v) => setActiveTab(v as Tab)}
            />
            {activeTab === 'problem' ? <ProblemDemo /> : <WorkaroundDemo />}
        </DemoShell>
    );
}
