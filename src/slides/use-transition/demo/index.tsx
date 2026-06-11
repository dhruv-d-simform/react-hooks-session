import { useState } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import TransitionDemo from './TransitionDemo';

export const fileUrl = '/src/slides/use-transition/demo/index.tsx';

type DemoTab = 'with' | 'without';

const DEMO_LABELS: Record<DemoTab, string> = {
    without: 'No transition ❌',
    with: 'useTransition ✅',
};

export default function Demo() {
    const [activeDemo, setActiveDemo] = useState<DemoTab>('without');

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
