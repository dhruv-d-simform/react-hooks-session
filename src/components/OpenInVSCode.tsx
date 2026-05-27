import { Code2 } from 'lucide-react';

const GITHUB_REPO = 'https://github.com/dhruv-d-simform/react-hooks-session';

interface Props {
    fileUrl: string;
}

function buildUrl(sourcePath: string): string {
    if (import.meta.env.DEV) {
        const absolutePath = import.meta.env.VITE_PROJECT_ROOT + sourcePath;
        return `vscode://file${absolutePath}`;
    }
    return `${GITHUB_REPO}/blob/main${sourcePath}`;
}

export default function OpenInVSCode({ fileUrl }: Props) {
    const href = buildUrl(fileUrl);
    const isGitHub = !import.meta.env.DEV;

    return (
        <a
            href={href}
            target={isGitHub ? '_blank' : undefined}
            rel={isGitHub ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-indigo-400 transition-colors"
            title={
                isGitHub
                    ? 'View source on GitHub'
                    : 'Open source file in VS Code'
            }
        >
            <Code2 size={12} />
            <span>{isGitHub ? 'View on GitHub' : 'Open in VS Code'}</span>
        </a>
    );
}
