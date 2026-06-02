import { useRef } from 'react';
import DemoShell from '@/components/demo/DemoShell';
import { ApiDescription } from './components/ApiDescription';
import { ParentControls } from './components/ParentControls';
import FancyInput from './FancyInput';
import type { FancyInputHandle } from './FancyInput';

export const fileUrl = '/src/slides/use-imperative-handle/demo/index.tsx';

export default function Demo() {
    const usernameRef = useRef<FancyInputHandle>(null);
    const passwordRef = useRef<FancyInputHandle>(null);

    return (
        <DemoShell fileUrl={fileUrl}>
            <ApiDescription />

            <div className="space-y-3">
                <FancyInput label="Username" ref={usernameRef} />
                <FancyInput label="Password" ref={passwordRef} />
            </div>

            <ParentControls
                onFocusUser={() => usernameRef.current?.focus()}
                onFocusPass={() => passwordRef.current?.focus()}
                onClearAll={() => {
                    usernameRef.current?.clear();
                    passwordRef.current?.clear();
                }}
                onShakeUser={() => usernameRef.current?.shake()}
            />
        </DemoShell>
    );
}
