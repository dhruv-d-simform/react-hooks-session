import type { SlideConfig } from '@/slides';

interface Props {
    slides: SlideConfig[];
    current: number;
    onSelect: (i: number) => void;
    isOpen: boolean;
}

export default function Sidebar({ slides, current, onSelect, isOpen }: Props) {
    const categories = [...new Set(slides.map((s) => s.category))];

    return (
        <aside
            className={`shrink-0 bg-zinc-900 flex flex-col transition-all duration-300 overflow-hidden ${
                isOpen ? 'w-52 border-r border-zinc-800' : 'w-0'
            }`}
        >
            {/* Fixed-width inner wrapper prevents content reflow during the transition */}
            <div className="w-52 flex flex-col flex-1 min-h-0">
                <nav className="flex-1 p-2 py-3 overflow-y-auto min-h-0">
                    {categories.map((category) => {
                        const categorySlides = slides.filter(
                            (s) => s.category === category
                        );
                        return (
                            <div key={category} className="mb-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-3 pb-1.5">
                                    {category}
                                </p>
                                {categorySlides.map((slide) => {
                                    const idx = slides.indexOf(slide);
                                    const isActive = idx === current;
                                    return (
                                        <button
                                            key={slide.id}
                                            onClick={() => onSelect(idx)}
                                            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors mb-0.5 ${
                                                isActive
                                                    ? 'bg-indigo-600 text-white font-medium'
                                                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                                            }`}
                                        >
                                            {slide.title}
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </nav>
                <div className="p-3 border-t border-zinc-800 shrink-0">
                    <p className="text-[10px] text-zinc-600 text-center">
                        ← → to navigate
                    </p>
                </div>
            </div>
        </aside>
    );
}
