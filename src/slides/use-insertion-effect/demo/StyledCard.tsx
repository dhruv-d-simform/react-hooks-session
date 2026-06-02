import { useInsertionEffect } from 'react';
import { THEMES } from './utils/data';

export default function StyledCard({ themeId }: { themeId: string }) {
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
