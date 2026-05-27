import { useState, type ReactNode } from 'react';
import { Code2, ChevronDown, ChevronUp } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

interface BulletPoint {
    text: string;
    highlight?: boolean;
}

interface Props {
    badge?: string;
    title: string;
    subtitle?: string;
    syntax?: string;
    bullets?: BulletPoint[];
    demo?: ReactNode;
    code?: string;
    codeTitle?: string;
    fullWidth?: boolean;
}

export default function SlideWrapper({
    badge,
    title,
    subtitle,
    syntax,
    bullets,
    demo,
    code,
    codeTitle,
    fullWidth = false,
}: Props) {
    const [showCode, setShowCode] = useState(false);

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-8 pt-5 pb-4 shrink-0">
                {badge && (
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mb-2.5">
                        {badge}
                    </span>
                )}
                <h1 className="text-3xl font-black tracking-tight mb-1">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-zinc-400 text-sm">{subtitle}</p>
                )}
            </div>

            {/* Main content */}
            <div
                className={`flex-1 overflow-hidden ${
                    fullWidth || !demo
                        ? 'px-8 pb-4 overflow-y-auto'
                        : 'grid grid-cols-[5fr_6fr] px-8 pb-4 gap-6'
                }`}
            >
                {/* Left: concepts */}
                <div className="flex flex-col gap-3 overflow-y-auto">
                    {syntax && (
                        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 shrink-0">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                                Syntax
                            </p>
                            <pre className="text-sm font-mono text-indigo-300 whitespace-pre-wrap leading-relaxed">
                                {syntax}
                            </pre>
                        </div>
                    )}
                    {bullets && bullets.length > 0 && (
                        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                                Key Points
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                {bullets.map((b, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2.5"
                                    >
                                        <span className="text-indigo-400 shrink-0 mt-0.5 text-xs">
                                            ▸
                                        </span>
                                        <span
                                            className={`text-sm leading-snug ${b.highlight ? 'text-zinc-100 font-medium' : 'text-zinc-300'}`}
                                        >
                                            {b.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right: demo */}
                {demo && (
                    <div className="overflow-y-auto">
                        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 h-full min-h-0">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
                                Live Demo
                            </p>
                            {demo}
                        </div>
                    </div>
                )}
            </div>

            {/* Collapsible code */}
            {code && (
                <div className="shrink-0 border-t border-zinc-800">
                    <button
                        onClick={() => setShowCode(!showCode)}
                        className="flex items-center gap-2 w-full px-8 py-2.5 text-xs text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50 transition-colors"
                    >
                        <Code2 size={13} />
                        <span>{showCode ? 'Hide Code' : 'Show Code'}</span>
                        {showCode ? (
                            <ChevronUp size={13} className="ml-auto" />
                        ) : (
                            <ChevronDown size={13} className="ml-auto" />
                        )}
                    </button>
                    {showCode && (
                        <div className="px-8 pb-4 max-h-60 overflow-y-auto">
                            <CodeBlock
                                code={code}
                                title={codeTitle ?? 'TypeScript'}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
