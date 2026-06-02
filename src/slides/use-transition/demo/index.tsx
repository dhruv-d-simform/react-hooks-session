import { useState, useTransition } from 'react';
import TabBar from '@/components/TabBar';
import DemoShell from '@/components/demo/DemoShell';
import StatusBanner from '@/components/demo/StatusBanner';
import { SlowTabContent } from './components/SlowTabContent';
import { ContentTabBar } from './components/ContentTabBar';
import { PendingIndicator } from './components/PendingIndicator';

export const fileUrl = '/src/slides/use-transition/demo/index.tsx';

type DemoTab = 'with' | 'without';
type ContentTab = 'posts' | 'photos' | 'videos';

const DEMO_LABELS: Record<DemoTab, string> = {
    with: 'useTransition ✅',
    without: 'No transition ❌',
};

function TransitionDemo({
    useTransitionEnabled,
}: {
    useTransitionEnabled: boolean;
}) {
    const [isPending, startTransition] = useTransition();
    const [activeTab, setActiveTab] = useState<ContentTab>('posts');

    const handleTabChange = (tab: ContentTab) => {
        if (useTransitionEnabled) {
            startTransition(() => setActiveTab(tab));
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={useTransitionEnabled}
                onMessage="✅ startTransition keeps UI responsive — old content stays while new tab loads"
                offMessage="❌ Direct setState — UI freezes on tab switch (try clicking rapidly)"
            />
            <ContentTabBar active={activeTab} onSelect={handleTabChange} />
            {isPending && <PendingIndicator tab={activeTab} />}
            <div className={isPending ? 'opacity-60' : ''}>
                <SlowTabContent tab={activeTab} />
            </div>
        </div>
    );
}

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
