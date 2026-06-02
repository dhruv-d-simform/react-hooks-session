import { useState } from 'react';
import InfoNote from '@/components/demo/InfoNote';
import { DrillBadge } from './components/DrillBadge';
import { DrillMiniHeader } from './components/DrillMiniHeader';
import { DrillMiniContent } from './components/DrillMiniContent';
import { DrillMiniFooter } from './components/DrillMiniFooter';

export const fileUrl = '/src/slides/use-context/demo/PropDrilling.tsx';

type Theme = 'dark' | 'light';

export default function PropDrilling() {
    const [theme, setTheme] = useState<Theme>('dark');

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <DrillBadge prop="theme, onToggle" />
                <p className="text-[10px] text-zinc-600">
                    passed manually at every level
                </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-zinc-700/50">
                <DrillMiniHeader
                    theme={theme}
                    onToggle={() =>
                        setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
                    }
                />
                <DrillMiniContent theme={theme} />
                <DrillMiniFooter theme={theme} />
            </div>
            <InfoNote color="rose">
                ⚠️ Every component must accept and forward{' '}
                <span className="font-mono">theme</span> as a prop — even if it
                doesn't use it directly.
            </InfoNote>
        </div>
    );
}
