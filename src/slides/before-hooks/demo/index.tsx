import { useState } from 'react';
import TabDemoShell from '@/components/demo/TabDemoShell';
import InfoNote from '@/components/demo/InfoNote';
import ClassCounter, { fileUrl as classUrl } from './ClassCounter';
import HooksCounter, { fileUrl as hooksUrl } from './HooksCounter';

type Tab = 'hooks' | 'class';

const TAB_LABELS: Record<Tab, string> = {
    hooks: 'Today (Hooks)',
    class: 'Pre-2018 (Class)',
};

const FILE_URLS: Record<Tab, string> = {
    hooks: hooksUrl,
    class: classUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('hooks');

    return (
        <TabDemoShell
            tabs={TAB_LABELS}
            fileUrls={FILE_URLS}
            activeTab={activeTab}
            onTabChange={(v) => setActiveTab(v as Tab)}
        >
            {activeTab === 'hooks' ? (
                <>
                    <HooksCounter />
                    <InfoNote color="emerald">
                        <span className="font-medium block mb-1">
                            ✅ What you write today
                        </span>
                        Each <span className="font-mono">useEffect</span> owns
                        one concern — setup and cleanup live in the same
                        function.
                    </InfoNote>
                </>
            ) : (
                <>
                    <ClassCounter />
                    <InfoNote color="amber">
                        <span className="font-medium block mb-1">
                            ⚠️ What it used to look like
                        </span>
                        Before hooks, the same logic was split across{' '}
                        <span className="font-mono">componentDidMount</span>,{' '}
                        <span className="font-mono">componentDidUpdate</span>,
                        and{' '}
                        <span className="font-mono">componentWillUnmount</span>{' '}
                        — related code, scattered across the class.
                    </InfoNote>
                </>
            )}
        </TabDemoShell>
    );
}
