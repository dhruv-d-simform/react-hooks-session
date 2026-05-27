import type { ReactNode } from 'react';

interface Props {
    left: ReactNode;
    right: ReactNode;
}

export default function SlideShell({ left, right }: Props) {
    return (
        <div className="flex h-full overflow-hidden">
            <div className="w-[44%] shrink-0 border-r border-zinc-800 overflow-y-auto slide-scroll">
                {left}
            </div>
            <div className="flex-1 overflow-y-auto slide-scroll">
                {right}
            </div>
        </div>
    );
}
