import TabBar from '@/components/TabBar';
import OpenInVSCode from '@/components/OpenInVSCode';

export default function TabDemoShell<T extends string>({
    tabs,
    fileUrls,
    activeTab,
    onTabChange,
    children,
}: {
    tabs: Record<T, string>;
    fileUrls: Record<T, string>;
    activeTab: T;
    onTabChange: (tab: T) => void;
    children: React.ReactNode;
}) {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Live Demo
                </p>
                <OpenInVSCode fileUrl={fileUrls[activeTab]} />
            </div>
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
                <TabBar
                    tabs={tabs}
                    active={activeTab}
                    onSelect={(v) => onTabChange(v as T)}
                />
                {children}
            </div>
        </div>
    );
}
