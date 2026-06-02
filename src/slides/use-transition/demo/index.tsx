import { useState } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import TransitionDemo from './TransitionDemo';

export const fileUrl = '/src/slides/use-transition/demo/index.tsx';

type DemoTab = 'with' | 'without';

const DEMO_LABELS: Record<DemoTab, string> = {
    with: 'useTransition ✅',
    without: 'No transition ❌',
};

export default function Demo() {
    const [activeDemo, setActiveDemo] = useState<DemoTab>('with');

    return (
        <DemoShell fileUrl={fileUrl}>
            <TabBar
                tabs={DEMO_LABELS}
                active={activeDemo}
                onSelect={(v) => setActiveDemo(v as DemoTab)}
            />
            <TransitionDemo
                key={activeDemo}
                useTransitionEnabled={activeDemo === 'with'}
            />
        </DemoShell>
    );
}
