import { Component } from 'react';
import SlideWrapper from '@/components/SlideWrapper';

interface CounterState {
    count: number;
    timer: number;
}

class ClassCounter extends Component<object, CounterState> {
    private intervalId?: ReturnType<typeof setInterval>;

    state: CounterState = { count: 0, timer: 0 };

    componentDidMount() {
        document.title = `Count: ${this.state.count}`;
        this.intervalId = setInterval(() => {
            this.setState((prev) => ({ timer: prev.timer + 1 }));
        }, 1000);
    }

    componentDidUpdate(_: object, prevState: CounterState) {
        if (prevState.count !== this.state.count) {
            document.title = `Count: ${this.state.count}`;
        }
    }

    componentWillUnmount() {
        document.title = 'React Hooks';
        clearInterval(this.intervalId);
    }

    increment = () => this.setState((prev) => ({ count: prev.count + 1 }));
    decrement = () => this.setState((prev) => ({ count: prev.count - 1 }));

    render() {
        const { count, timer } = this.state;
        return (
            <div className="space-y-5">
                <div>
                    <p className="text-xs text-zinc-500 mb-3">
                        Counter — updates document title on change:
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
                </div>

                <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-4 space-y-1.5">
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

                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                    <p className="text-xs text-amber-400 font-medium mb-1">
                        Notice the code problems:
                    </p>
                    <p className="text-xs text-amber-600">
                        Timer setup & cleanup are in different lifecycle methods
                        — related logic is scattered.
                    </p>
                </div>
            </div>
        );
    }
}

const code = `class Counter extends Component<{}, { count: number; timer: number }> {
  private intervalId?: ReturnType<typeof setInterval>
  state = { count: 0, timer: 0 }

  componentDidMount() {
    document.title = \`Count: \${this.state.count}\`
    // ⚠️ Timer START lives here...
    this.intervalId = setInterval(() => {
      this.setState(prev => ({ timer: prev.timer + 1 }))
    }, 1000)
  }

  componentDidUpdate(_: object, prevState: typeof this.state) {
    if (prevState.count !== this.state.count) {
      document.title = \`Count: \${this.state.count}\`  // duplicated logic
    }
  }

  componentWillUnmount() {
    document.title = 'React Hooks'
    clearInterval(this.intervalId)  // ⚠️ Timer CLEANUP lives here
  }

  // Must bind or use arrow functions to avoid 'this' issues
  increment = () => this.setState(prev => ({ count: prev.count + 1 }))
  decrement = () => this.setState(prev => ({ count: prev.count - 1 }))

  render() { /* JSX */ }
}`;

export default function ClassComponentsSlide() {
    return (
        <SlideWrapper
            badge="Before Hooks"
            title="Class Components"
            subtitle="State and lifecycle in class-based React — the original way to build stateful UIs"
            bullets={[
                {
                    text: 'State lives in this.state, updated via this.setState()',
                },
                {
                    text: 'componentDidMount → runs after first render (like "setup")',
                },
                { text: 'componentDidUpdate → runs after every re-render' },
                {
                    text: 'componentWillUnmount → cleanup before component is removed',
                },
                {
                    text: 'Timer setup is in mount, cleanup is in unmount — logic is split',
                    highlight: true,
                },
                {
                    text: 'Must use arrow functions or bind(this) for event handlers',
                },
                { text: 'Class components are deprecated in React 19' },
            ]}
            demo={<ClassCounter />}
            code={code}
        />
    );
}
