import { useState } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';
import WithContext, { fileUrl as contextUrl } from './WithContext';
import PropDrilling, { fileUrl as drillingUrl } from './PropDrilling';

type Tab = 'context' | 'drilling';

const TAB_LABELS: Record<Tab, string> = {
    context: 'useContext',
    drilling: 'Prop Drilling',
};

const FILE_URLS: Record<Tab, string> = {
    context: contextUrl,
    drilling: drillingUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('context');

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
                {activeTab === 'context' ? <WithContext /> : <PropDrilling />}
            </div>
        </div>
    );
}
