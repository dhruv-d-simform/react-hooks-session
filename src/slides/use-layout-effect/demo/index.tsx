import {
    useState,
    useEffect,
    useLayoutEffect,
    useRef,
    useCallback,
} from 'react';
import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-layout-effect/demo/index.tsx';

type Tab = 'layout' | 'effect';

const TAB_LABELS: Record<Tab, string> = {
    layout: 'useLayoutEffect ✅',
    effect: 'useEffect ⚠️',
};

function TooltipDemo({ useLayout }: { useLayout: boolean }) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const tipRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({
        opacity: 0,
        top: 0,
        left: 0,
    });

    const reposition = useCallback(() => {
        if (!btnRef.current || !tipRef.current || !containerRef.current) return;
        const btn = btnRef.current.getBoundingClientRect();
        const tip = tipRef.current.getBoundingClientRect();
        const container = containerRef.current.getBoundingClientRect();

        const relLeft =
            btn.left - container.left + btn.width / 2 - tip.width / 2;
        let relTop = btn.top - container.top - tip.height - 8;

        if (relTop < 0) {
            relTop = btn.top - container.top + btn.height + 8;
        }

        setStyle({ opacity: 1, top: relTop, left: relLeft });
    }, []);

    useLayoutEffect(() => {
        if (!useLayout || !open) return;
        reposition();
    }, [open, useLayout, reposition]);

    useEffect(() => {
        if (useLayout || !open) return;
        reposition();
    }, [open, useLayout, reposition]);

    return (
        <div
            ref={containerRef}
            className="relative bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-6 flex flex-col items-center gap-4"
            style={{ minHeight: 140 }}
        >
            {open && (
                <div
                    ref={tipRef}
                    className="absolute z-10 bg-zinc-700 border border-zinc-600 rounded-lg px-3 py-2 text-xs text-zinc-200 whitespace-nowrap shadow-lg pointer-events-none"
                    style={style}
                >
                    I'm positioned dynamically 📍
                </div>
            )}

            <p className="text-xs text-zinc-500 text-center">
                {useLayout ? (
                    <>
                        <span className="font-mono text-amber-300">
                            useLayoutEffect
                        </span>{' '}
                        positions tooltip before paint — no flicker
                    </>
                ) : (
                    <>
                        <span className="font-mono text-indigo-300">
                            useEffect
                        </span>{' '}
                        positions after paint — watch for the jump on open
                    </>
                )}
            </p>

            <button
                ref={btnRef}
                onClick={() => {
                    setStyle({ opacity: 0, top: 0, left: 0 });
                    setOpen((v) => !v);
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium transition-colors"
            >
                {open ? 'Hide tooltip' : 'Show tooltip'}
            </button>
        </div>
    );
}

export default function Demo() {
    const [activeTab, setActiveTab] = useState<Tab>('layout');

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
                    tabs={TAB_LABELS}
                    active={activeTab}
                    onSelect={(v) => setActiveTab(v as Tab)}
                />
                <TooltipDemo
                    key={activeTab}
                    useLayout={activeTab === 'layout'}
                />
                <div
                    className={`rounded-lg p-3 text-[11px] leading-relaxed border ${
                        activeTab === 'layout'
                            ? 'bg-emerald-900/15 border-emerald-700/25 text-emerald-400'
                            : 'bg-amber-900/15 border-amber-700/25 text-amber-400'
                    }`}
                >
                    {activeTab === 'layout' ? (
                        <>
                            ✅ Tooltip appears directly at the correct position
                            — measurement happened before paint.
                        </>
                    ) : (
                        <>
                            ⚠️ Tooltip briefly flickers at{' '}
                            <span className="font-mono">top:0 left:0</span>{' '}
                            before jumping to correct position. Slow connections
                            make this very noticeable.
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
