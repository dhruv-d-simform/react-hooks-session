import { useState } from 'react';
import StatusBanner from '@/components/demo/StatusBanner';
import { ProfileTabBar } from './components/ProfileTabBar';
import { TabContent, type ProfileTab } from './components/TabContent';
import { FreezeProbe } from './components/FreezeProbe';

export const fileUrl = '/src/slides/use-transition/demo/TabsDemoWithout.tsx';

export default function TabsDemoWithout() {
    const [tab, setTab] = useState<ProfileTab>('about');

    return (
        <div className="space-y-3">
            <StatusBanner
                enabled={false}
                onMessage=""
                offMessage="❌ Plain setState — clicking a 🐢 tab freezes everything until the slow render finishes. The tab highlight doesn't even move, and the button stops responding."
            />
            <FreezeProbe />
            <ProfileTabBar active={tab} onSelect={setTab} />
            <TabContent tab={tab} />
        </div>
    );
}
