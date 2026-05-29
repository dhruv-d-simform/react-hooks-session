import { useState } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';
import Refactor, { fileUrl as refactorUrl } from './Refactor';
import UseLocalStorage, { fileUrl as storageUrl } from './UseLocalStorage';
import ComposedSearch, { fileUrl as composedUrl } from './ComposedSearch';

type Tab = 'refactor' | 'storage' | 'composed';

const TAB_LABELS: Record<Tab, string> = {
    refactor: 'Refactor',
    storage: 'useLocalStorage',
    composed: 'Composed',
};

const FILE_URLS: Record<Tab, string> = {
    refactor: refactorUrl,
    storage: storageUrl,
    composed: composedUrl,
};

const NOTES: Record<Tab, string> = {
    refactor:
        'The why — extract tangled fetch logic into useFetch and the component shrinks to one line.',
    storage:
        'A drop-in useState replacement that persists. Same API shape, extra behavior.',
    composed: 'The power — a custom hook built on top of another custom hook.',
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('refactor');

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

                <p className="text-[11px] text-zinc-500 leading-relaxed">
                    {NOTES[activeTab]}
                </p>

                {activeTab === 'refactor' && <Refactor />}
                {activeTab === 'storage' && <UseLocalStorage />}
                {activeTab === 'composed' && <ComposedSearch />}
            </div>
        </div>
    );
}
