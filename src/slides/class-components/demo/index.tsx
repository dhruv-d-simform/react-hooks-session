import { useState } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';
import ClassCounter, { fileUrl as classUrl } from './ClassCounter';
import HooksCounter, { fileUrl as hooksUrl } from './HooksCounter';

type Tab = 'class' | 'hooks';

const TAB_LABELS: Record<Tab, string> = {
    class: 'Class Component',
    hooks: 'With Hooks',
};

const FILE_URLS: Record<Tab, string> = {
    class: classUrl,
    hooks: hooksUrl,
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('class');

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
                {activeTab === 'class' ? (
                    <div className="space-y-4">
                        <ClassCounter />
                        <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                            <p className="text-xs text-amber-400 font-medium mb-1">
                                ⚠️ The problem:
                            </p>
                            <p className="text-xs text-amber-600">
                                Timer setup and cleanup live in{' '}
                                <span className="font-semibold">
                                    different lifecycle methods
                                </span>{' '}
                                — related logic is scattered across the class.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <HooksCounter />
                        <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-3">
                            <p className="text-xs text-emerald-400 font-medium mb-1">
                                ✅ The fix:
                            </p>
                            <p className="text-xs text-emerald-600">
                                Each useEffect manages one concern. Setup and
                                cleanup live together — no lifecycle juggling.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
