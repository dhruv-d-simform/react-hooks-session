import { useEffect, useCallback, useState } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router';
import { slides } from '@/slides';
import Sidebar from '@/components/Sidebar';
import {
    ChevronLeft,
    ChevronRight,
    PanelLeftOpen,
    PanelLeftClose,
    Github,
} from 'lucide-react';
import { GITHUB_REPO } from '@/constants';

function SlideView() {
    const { slideId } = useParams<{ slideId: string }>();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentIndex = slides.findIndex((s) => s.id === slideId);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;

    const goTo = useCallback(
        (index: number) => {
            const bounded = Math.max(0, Math.min(index, slides.length - 1));
            navigate(`/${slides[bounded].id}`);
        },
        [navigate]
    );

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                goTo(safeIndex + 1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                goTo(safeIndex - 1);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [safeIndex, goTo]);

    if (currentIndex < 0) {
        return <Navigate to={`/${slides[0].id}`} replace />;
    }

    const CurrentSlide = slides[currentIndex].component;

    return (
        <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
            {/* Header spans full width, unaffected by sidebar */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900 shrink-0">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen((v) => !v)}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors shrink-0"
                        title={
                            sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'
                        }
                    >
                        {sidebarOpen ? (
                            <PanelLeftClose size={17} />
                        ) : (
                            <PanelLeftOpen size={17} />
                        )}
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold shrink-0">
                            ⚛
                        </div>
                        <div>
                            <p className="text-sm font-bold leading-tight">
                                React Hooks
                            </p>
                            <p className="text-[10px] text-zinc-500">Session</p>
                        </div>
                    </div>
                    <span className="text-zinc-700 select-none">|</span>
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                        {currentIndex + 1} / {slides.length}
                    </span>
                    <span className="text-xs text-zinc-500">
                        {slides[currentIndex].category}
                    </span>
                    <span className="text-zinc-700">/</span>
                    <span className="text-sm font-semibold text-zinc-200">
                        {slides[currentIndex].title}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <a
                        href={GITHUB_REPO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                        title="View on GitHub"
                    >
                        <Github size={17} />
                    </a>
                    <button
                        onClick={() => goTo(currentIndex - 1)}
                        disabled={currentIndex === 0}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-zinc-400 hover:text-zinc-100"
                        title="Previous (←)"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => goTo(currentIndex + 1)}
                        disabled={currentIndex === slides.length - 1}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-zinc-400 hover:text-zinc-100"
                        title="Next (→)"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </header>

            {/* Sidebar + slide content share the remaining height */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    slides={slides}
                    current={currentIndex}
                    onSelect={goTo}
                    isOpen={sidebarOpen}
                />
                <main className="flex-1 overflow-hidden">
                    <CurrentSlide />
                </main>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/:slideId" element={<SlideView />} />
            <Route
                path="*"
                element={<Navigate to={`/${slides[0].id}`} replace />}
            />
        </Routes>
    );
}
