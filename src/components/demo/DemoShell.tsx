import OpenInVSCode from '@/components/OpenInVSCode';

export default function DemoShell({
    fileUrl,
    children,
}: {
    fileUrl: string;
    children: React.ReactNode;
}) {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrl} />
            </div>
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                {children}
            </div>
        </div>
    );
}
