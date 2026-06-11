import { useState } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import InfoNote from '@/components/demo/InfoNote';
import { IdToggle } from './components/IdToggle';
import PasswordField from './PasswordField';
import BrokenPasswordField from './BrokenPasswordField';

export const fileUrl = '/src/slides/use-id/demo/index.tsx';

export default function Demo() {
    const [showBroken, setShowBroken] = useState(true);

    return (
        <DemoShell fileUrl={fileUrl}>
            <IdToggle showBroken={showBroken} onToggle={setShowBroken} />

            {showBroken ? (
                <>
                    <BrokenPasswordField
                        label="Login Form"
                        hardcodedId="password"
                    />
                    <BrokenPasswordField
                        label="Register Form"
                        hardcodedId="password"
                    />
                    <InfoNote color="rose">
                        ⚠️ Both fields share{' '}
                        <span className="font-mono">id="password"</span> —
                        clicking either label focuses only the first input.
                        Accessibility broken.
                    </InfoNote>
                </>
            ) : (
                <>
                    <PasswordField label="Login Form" />
                    <PasswordField label="Register Form" />
                    <InfoNote color="emerald">
                        ✅ Each instance has a unique ID — clicking either label
                        focuses the correct input.
                    </InfoNote>
                </>
            )}
        </DemoShell>
    );
}
