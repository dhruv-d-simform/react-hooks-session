import { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { TooltipOverlay } from './components/TooltipOverlay';

export default function TooltipDemoLayout() {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const tipRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({
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
        if (relTop < 0) relTop = btn.top - container.top + btn.height + 8;

        setStyle({ top: relTop, left: relLeft });
    }, []);

    useLayoutEffect(() => {
        if (!open) return;
        reposition();
    }, [open, reposition]);

    return (
        <div
            ref={containerRef}
            className="relative bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-6 flex flex-col items-center gap-4"
            style={{ minHeight: 140 }}
        >
            {open && <TooltipOverlay style={style} tipRef={tipRef} />}
            <p className="text-xs text-zinc-500 text-center">
                <span className="font-mono text-amber-300">
                    useLayoutEffect
                </span>{' '}
                positions tooltip before paint — no flicker
            </p>
            <button
                ref={btnRef}
                onClick={() => {
                    setStyle({ top: 0, left: 0 });
                    setOpen((v) => !v);
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium transition-colors"
            >
                {open ? 'Hide tooltip' : 'Show tooltip'}
            </button>
        </div>
    );
}
