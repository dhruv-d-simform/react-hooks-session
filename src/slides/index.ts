import type { ComponentType } from 'react';
import Intro from './Intro';
import ClassComponents from './ClassComponents';
import WhyHooks from './WhyHooks';
import UseState from './UseState';
import UseEffect from './UseEffect';
import UseContext from './UseContext';
import UseRef from './UseRef';
import UseReducer from './UseReducer';
import UsePerformance from './UsePerformance';
import CustomHooks from './CustomHooks';

export interface SlideConfig {
    id: string;
    title: string;
    category: string;
    component: ComponentType;
}

export const slides: SlideConfig[] = [
    {
        id: 'intro',
        title: 'Introduction',
        category: 'Overview',
        component: Intro,
    },
    {
        id: 'class-components',
        title: 'Class Components',
        category: 'The Problem',
        component: ClassComponents,
    },
    {
        id: 'why-hooks',
        title: 'Why Hooks?',
        category: 'The Problem',
        component: WhyHooks,
    },
    {
        id: 'use-state',
        title: 'useState',
        category: 'Hooks',
        component: UseState,
    },
    {
        id: 'use-effect',
        title: 'useEffect',
        category: 'Hooks',
        component: UseEffect,
    },
    {
        id: 'use-context',
        title: 'useContext',
        category: 'Hooks',
        component: UseContext,
    },
    { id: 'use-ref', title: 'useRef', category: 'Hooks', component: UseRef },
    {
        id: 'use-reducer',
        title: 'useReducer',
        category: 'Hooks',
        component: UseReducer,
    },
    {
        id: 'use-performance',
        title: 'useMemo & useCallback',
        category: 'Hooks',
        component: UsePerformance,
    },
    {
        id: 'custom-hooks',
        title: 'Custom Hooks',
        category: 'Custom Hooks',
        component: CustomHooks,
    },
];
