import { Component } from 'react';

interface CounterState {
    count: number;
    timer: number;
}

export default class ClassCounter extends Component<object, CounterState> {
    private intervalId?: ReturnType<typeof setInterval>;
    state: CounterState = { count: 0, timer: 0 };

    componentDidMount() {
        document.title = `Count: ${this.state.count}`; // 1️⃣ title sync
        this.intervalId = setInterval(() => {
            // 2️⃣ timer START
            this.setState((prev) => ({ timer: prev.timer + 1 }));
        }, 1000);
    }

    componentDidUpdate(_: object, prevState: CounterState) {
        if (prevState.count !== this.state.count) {
            document.title = `Count: ${this.state.count}`; // 1️⃣ title sync (again)
        }
    }

    componentWillUnmount() {
        document.title = 'React Hooks'; // 1️⃣ title cleanup
        clearInterval(this.intervalId); // 2️⃣ timer CLEANUP — far from START ⚠️
    }

    increment = () => this.setState((p) => ({ count: p.count + 1 }));
    decrement = () => this.setState((p) => ({ count: p.count - 1 }));

    render() {
        const { count, timer } = this.state;
        return (
            <div className="space-y-4">
                <p className="text-xs text-zinc-500">
                    Counter — syncs document title on every change:
                </p>
                <div className="flex items-center gap-4">
                    <button
                        onClick={this.decrement}
                        className="w-10 h-10 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-xl font-bold transition-colors"
                    >
                        −
                    </button>
                    <span className="text-5xl font-black font-mono w-20 text-center tabular-nums">
                        {count}
                    </span>
                    <button
                        onClick={this.increment}
                        className="w-10 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xl font-bold transition-colors"
                    >
                        +
                    </button>
                </div>
                <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-4 space-y-1">
                    <p className="text-xs text-zinc-400">
                        ⏱ Component alive:{' '}
                        <span className="font-mono text-indigo-300 font-semibold">
                            {timer}s
                        </span>
                    </p>
                    <p className="text-xs text-zinc-600">
                        Timer started in componentDidMount — cleared in
                        componentWillUnmount
                    </p>
                </div>
            </div>
        );
    }
}

export const fileUrl = '/src/slides/before-hooks/demo/ClassCounter.tsx';
