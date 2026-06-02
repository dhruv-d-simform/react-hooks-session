import { useState, useInsertionEffect } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { ThemePicker } from './components/ThemePicker';
import { THEMES } from './utils/data';

export const fileUrl = '/src/slides/use-insertion-effect/demo/index.tsx';

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
        <DemoShell fileUrl={fileUrl}>
            <div className="bg-zinc-800/40 border border-zinc-700/30 rounded-lg p-3">
                <p className="text-xs text-zinc-500 leading-relaxed">
                    Each theme injects a{' '}
                    <span className="font-mono text-zinc-300">{'<style>'}</span>{' '}
                    tag via{' '}
                    <span className="font-mono text-purple-400">
                        useInsertionEffect
                    </span>{' '}
                    before React paints — the card is never styled-wrong for a
                    frame.
                </p>
            </div>

            <StyledCard themeId={themeId} />

            <ThemePicker themeId={themeId} onSelect={setThemeId} />

            <InfoNote color="purple">
                🛠️ In production this pattern lives inside your CSS-in-JS
                library, not your components.
            </InfoNote>
        </DemoShell>
    );
}
