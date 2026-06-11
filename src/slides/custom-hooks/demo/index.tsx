import DemoShell from '@/components/demo/DemoShell';
import UserExplorer from './UserExplorer';

export default function Demo() {
    return (
        <DemoShell fileUrl="/src/slides/custom-hooks/demo/UserExplorer.tsx">
            <UserExplorer />
        </DemoShell>
    );
}
