import { useState, useInsertionEffect } from 'react';
import OpenInVSCode from '@/components/OpenInVSCode';

export const fileUrl = '/src/slides/use-insertion-effect/demo/index.tsx';

const THEMES = [
    {
        name: 'Ocean',
        id: 'ocean',
        css: `.css-in-js-card { background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); border-color: #2c5364; color: #e0f7fa; }`,
    },
    {
        name: 'Sunset',
        id: 'sunset',
        css: `.css-in-js-card { background: linear-gradient(135deg, #f093fb, #f5576c, #fda085); border-color: #f5576c; color: #fff; }`,
    },
    {
        name: 'Forest',
        id: 'forest',
        css: `.css-in-js-card { background: linear-gradient(135deg, #134e5e, #1a3a2a, #2d6a4f); border-color: #2d6a4f; color: #d8f3dc; }`,
    },
];

function StyledCard({ themeId }: { themeId: string }) {
    const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

    useInsertionEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.id = `css-in-js-${themeId}`;
        styleEl.textContent = theme.css;
        document.head.appendChild(styleEl);

        return () => {
            document.head.removeChild(styleEl);
        };
    }, [theme.css, themeId]);

    return (
        <div className="css-in-js-card rounded-xl border p-5 space-y-2 transition-all duration-300">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                {theme.name} Theme
            </p>
            <p className="text-base font-bold">Styled before first paint</p>
            <p className="text-xs opacity-60 leading-relaxed">
                This card's CSS was injected by{' '}
                <span className="font-mono">useInsertionEffect</span> — it never
                appears unstyled.
            </p>
        </div>
    );
}

export default function Demo() {
    const [themeId, setThemeId] = useState('ocean');

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        Each theme injects a{' '}
                        <span className="font-mono text-zinc-300">
                            {'<style>'}
                        </span>{' '}
                        tag via{' '}
                        <span className="font-mono text-purple-400">
                            useInsertionEffect
                        </span>{' '}
                        before React paints — the card is never styled-wrong for
                        a frame.
                    </p>
                </div>

                <StyledCard themeId={themeId} />

                <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                        Switch theme
                    </p>
                    <div className="flex gap-2">
                        {THEMES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setThemeId(t.id)}
                                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors border ${
                                    themeId === t.id
                                        ? 'bg-purple-600 border-purple-500 text-white'
                                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-purple-900/15 border border-purple-700/25 rounded-lg p-3">
                    <p className="text-[11px] text-purple-300/80">
                        🛠️ In production this pattern lives inside your
                        CSS-in-JS library, not your components.
                    </p>
                </div>
            </div>
        </div>
    );
}
