import CodeBlock from '@/components/CodeBlock';
import OpenInVSCode from '@/components/OpenInVSCode';

interface Props {
    code: string;
    title?: string;
    fileUrl: string;
}

export default function SourceSection({ code, title, fileUrl }: Props) {
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Source
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>
            <CodeBlock code={code} title={title} />
        </div>
    );
}
