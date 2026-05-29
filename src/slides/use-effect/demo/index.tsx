import { useState } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';
import DataFetching, { fileUrl as fetchUrl } from './DataFetching';
import DepsExplorer, { fileUrl as depsUrl } from './DepsExplorer';

type Tab = 'fetch' | 'deps';

const TAB_LABELS: Record<Tab, string> = {
    fetch: 'Data Fetching',
    deps: 'Deps Explorer',
};

const FILE_URLS: Record<Tab, string> = {
    fetch: fetchUrl,
    deps: depsUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('fetch');

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
                {activeTab === 'fetch' ? <DataFetching /> : <DepsExplorer />}
            </div>
        </div>
    );
}
