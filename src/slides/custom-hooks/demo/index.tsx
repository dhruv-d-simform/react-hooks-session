import DemoShell from '@/components/demo/DemoShell';
import FocusTimer from './FocusTimer';

export default function Demo() {
    return (
        <DemoShell fileUrl="/src/slides/custom-hooks/demo/FocusTimer.tsx">
            <FocusTimer />
        </DemoShell>
    );
}
