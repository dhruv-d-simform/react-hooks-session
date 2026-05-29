import { useState } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';
import DomRef, { fileUrl as domUrl } from './DomRef';
import MutableValue, { fileUrl as mutableUrl } from './MutableValue';

type Tab = 'dom' | 'mutable';

const TAB_LABELS: Record<Tab, string> = {
    dom: 'DOM Ref',
    mutable: 'Mutable Value',
};

const FILE_URLS: Record<Tab, string> = {
    dom: domUrl,
    mutable: mutableUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('dom');

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
                {activeTab === 'dom' ? <DomRef /> : <MutableValue />}
            </div>
        </div>
    );
}
