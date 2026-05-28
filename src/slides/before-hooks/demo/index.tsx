import { useState } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';
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
                {activeTab === 'hooks' ? (
                    <div className="space-y-4">
                        <HooksCounter />
                        <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-3">
                            <p className="text-xs text-emerald-400 font-medium mb-1">
                                ✅ What you write today
                            </p>
                            <p className="text-xs text-emerald-600">
                                Each{' '}
                                <span className="font-mono">useEffect</span>{' '}
                                owns one concern — setup and cleanup live in the
                                same function.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <ClassCounter />
                        <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                            <p className="text-xs text-amber-400 font-medium mb-1">
                                ⚠️ What it used to look like
                            </p>
                            <p className="text-xs text-amber-600">
                                Before hooks, the same logic was split across{' '}
                                <span className="font-mono">
                                    componentDidMount
                                </span>
                                ,{' '}
                                <span className="font-mono">
                                    componentDidUpdate
                                </span>
                                , and{' '}
                                <span className="font-mono">
                                    componentWillUnmount
                                </span>{' '}
                                — related code, scattered across the class.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
