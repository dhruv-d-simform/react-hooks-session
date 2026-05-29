import { useState } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';
import CardBuilder, { fileUrl as cardUrl } from './CardBuilder';
import FunctionalUpdate, { fileUrl as updateUrl } from './FunctionalUpdate';

type Tab = 'builder' | 'functional';

const TAB_LABELS: Record<Tab, string> = {
    builder: 'Card Builder',
    functional: 'Functional Update',
};

const FILE_URLS: Record<Tab, string> = {
    builder: cardUrl,
    functional: updateUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('builder');

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={FILE_URLS[activeTab]} />
            </div>
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <TabBar
                    tabs={TAB_LABELS}
                    active={activeTab}
                    onSelect={(v) => setActiveTab(v as Tab)}
                />
                {activeTab === 'builder' ? (
                    <CardBuilder />
                ) : (
                    <FunctionalUpdate />
                )}
            </div>
        </div>
    );
}
