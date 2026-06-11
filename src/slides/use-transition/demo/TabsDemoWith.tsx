import { useState, useTransition } from 'react';
import StatusBanner from '@/components/demo/StatusBanner';
import { ProfileTabBar } from './components/ProfileTabBar';
import { TabContent, type ProfileTab } from './components/TabContent';
import { FreezeProbe } from './components/FreezeProbe';

export const fileUrl = '/src/slides/use-transition/demo/TabsDemoWith.tsx';

export default function TabsDemoWith() {
    const [isPending, startTransition] = useTransition();
    // Urgent state — updates instantly so the clicked tab highlights right away
    const [selectedTab, setSelectedTab] = useState<ProfileTab>('about');
    // Non-urgent state — drives the slow content, updated inside the transition
    const [contentTab, setContentTab] = useState<ProfileTab>('about');

    const handleSelect = (tab: ProfileTab) => {
        setSelectedTab(tab);
        startTransition(() => setContentTab(tab));
    };

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={true}
                onMessage="✅ setContentTab is wrapped in startTransition — the highlight moves instantly, the old content stays visible while the new tab renders in the background, and the button keeps working."
                offMessage=""
            />
            <FreezeProbe />
            <ProfileTabBar
                active={selectedTab}
                pendingTab={isPending ? selectedTab : null}
                onSelect={handleSelect}
            />
            <div
                className={`transition-opacity duration-150 ${isPending ? 'opacity-50' : 'opacity-100'}`}
            >
                <TabContent tab={contentTab} />
            </div>
        </div>
    );
}
