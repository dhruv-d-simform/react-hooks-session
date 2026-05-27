interface Props {
    children: string;
}

export default function SyntaxBlock({ children }: Props) {
    return (
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Syntax</p>
            <pre className="text-sm font-mono text-indigo-300 whitespace-pre-wrap leading-relaxed">{children}</pre>
        </div>
    );
}
