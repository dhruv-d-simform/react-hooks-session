import { useState } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { ThemePicker } from './components/ThemePicker';
import StyledCard from './StyledCard';

export const fileUrl = '/src/slides/use-insertion-effect/demo/index.tsx';

export default function Demo() {
    const [themeId, setThemeId] = useState('ocean');

    return (
        <DemoShell fileUrl={fileUrl}>
            <InfoNote color="zinc">
                Each theme injects a{' '}
                <span className="font-mono text-zinc-300">{'<style>'}</span> tag
                via{' '}
                <span className="font-mono text-purple-400">
                    useInsertionEffect
                </span>{' '}
                before React paints — the card is never styled-wrong for a
                frame.
            </InfoNote>

            <StyledCard themeId={themeId} />

            <ThemePicker themeId={themeId} onSelect={setThemeId} />

            <InfoNote color="purple">
                🛠️ In production this pattern lives inside your CSS-in-JS
                library, not your components.
            </InfoNote>
        </DemoShell>
    );
}
