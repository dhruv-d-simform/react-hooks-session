import { Code2 } from 'lucide-react';

interface Props {
    fileUrl: string;
}

function buildVSCodeUrl(fileUrl: string): string {
    const url = new URL(fileUrl);
    // url.pathname = /src/slides/use-state/Demo.tsx
    const absolutePath = import.meta.env.VITE_PROJECT_ROOT + url.pathname;
    return `vscode://file${absolutePath}`;
}

export default function OpenInVSCode({ fileUrl }: Props) {
    return (
        <a
            href={buildVSCodeUrl(fileUrl)}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-indigo-400 transition-colors"
            title="Open source file in VS Code"
        >
            <Code2 size={12} />
            <span>Open in VS Code</span>
        </a>
    );
}
