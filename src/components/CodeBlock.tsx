import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
    code: string;
    title?: string;
}

export default function CodeBlock({ code, title = 'TypeScript' }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                <span className="text-xs font-mono text-zinc-500">{title}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors"
                >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-zinc-300 whitespace-pre">
                <code>{code}</code>
            </pre>
        </div>
    );
}
