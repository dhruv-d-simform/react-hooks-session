import { useState, useTransition } from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-transition/demo/index.tsx';

type DemoTab = 'with' | 'without';
type ContentTab = 'posts' | 'photos' | 'videos';

const DEMO_LABELS: Record<DemoTab, string> = {
    with: 'useTransition ✅',
    without: 'No transition ❌',
};

const CONTENT_TABS: Record<ContentTab, string> = {
    posts: 'Posts',
    photos: 'Photos',
    videos: 'Videos',
};

// Simulate a slow component
function SlowTabContent({ tab }: { tab: ContentTab }) {
    // Block for ~80ms to simulate a heavy render
    const start = performance.now();
    while (performance.now() - start < 80) {}

    const items = {
        posts: [
            'React 19 release notes',
            'Understanding hooks',
            'Server components explained',
            'New concurrent features',
        ],
        photos: [
            'Sunset over mountains',
            'City lights at night',
            'Morning coffee',
            'Abstract architecture',
        ],
        videos: [
            'useTransition deep dive',
            'React performance tips',
            'Building with RSC',
            'Hooks workshop recap',
        ],
    };

    return (
        <div className="space-y-2">
            {items[tab].map((item) => (
                <div
                    key={item}
                    className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2.5"
                >
                    <p className="text-xs text-zinc-300">{item}</p>
                </div>
            ))}
        </div>
    );
}

function TransitionDemo({
    useTransitionEnabled,
}: {
    useTransitionEnabled: boolean;
}) {
    const [isPending, startTransition] = useTransition();
    const [activeTab, setActiveTab] = useState<ContentTab>('posts');

    const handleTabChange = (tab: ContentTab) => {
        if (useTransitionEnabled) {
            startTransition(() => setActiveTab(tab));
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <div className="space-y-3">
            <div
                className={`rounded-lg p-2.5 border text-[11px] ${useTransitionEnabled ? 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400' : 'bg-rose-900/15 border-rose-700/25 text-rose-400'}`}
            >
                {useTransitionEnabled
                    ? '✅ startTransition keeps UI responsive — old content stays while new tab loads'
                    : '❌ Direct setState — UI freezes on tab switch (try clicking rapidly)'}
            </div>

            <div className="flex items-center gap-1 bg-zinc-800 p-1 rounded-lg">
                {(Object.entries(CONTENT_TABS) as [ContentTab, string][]).map(
                    ([tab, label]) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-colors ${
                                activeTab === tab
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                            {label}
                        </button>
                    )
                )}
            </div>

            {isPending && (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                    <span className="text-[11px] text-indigo-400">
                        Loading {activeTab}…
                    </span>
                </div>
            )}

            <div className={isPending ? 'opacity-60' : ''}>
                <SlowTabContent tab={activeTab} />
            </div>
        </div>
    );
}

export default function Demo() {
    const [activeDemo, setActiveDemo] = useState<DemoTab>('with');

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <TabBar
                    tabs={DEMO_LABELS}
                    active={activeDemo}
                    onSelect={(v) => setActiveDemo(v as DemoTab)}
                />
                <TransitionDemo
                    key={activeDemo}
                    useTransitionEnabled={activeDemo === 'with'}
                />
            </div>
        </div>
    );
}
