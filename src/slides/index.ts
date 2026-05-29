import type { ComponentType } from 'react';
import Intro from './intro';
import BeforeHooks from './before-hooks';
import AllHooks from './all-hooks';
import UseState from './use-state';
import UseReducer from './use-reducer';
import UseContext from './use-context';
import UseRef from './use-ref';
import UseImperativeHandle from './use-imperative-handle';
import UseEffect from './use-effect';
import UseLayoutEffect from './use-layout-effect';
import UseEffectEvent from './use-effect-event';
import UseInsertionEffect from './use-insertion-effect';
import UseMemo from './use-memo';
import UseCallback from './use-callback';
import UseTransition from './use-transition';
import UseDeferredValue from './use-deferred-value';
import UseId from './use-id';
import UseDebugValue from './use-debug-value';
import UseSyncExternalStore from './use-sync-external-store';
import UseHook from './use-hook';
import UseActionState from './use-action-state';
import UseOptimistic from './use-optimistic';

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
        id: 'before-hooks',
        title: 'Before Hooks',
        category: 'Origin',
        component: BeforeHooks,
    },
    {
        id: 'all-hooks',
        title: 'All Hooks',
        category: 'Catalog',
        component: AllHooks,
    },
    {
        id: 'use-state',
        title: 'useState',
        category: 'State',
        component: UseState,
    },
    {
        id: 'use-reducer',
        title: 'useReducer',
        category: 'State',
        component: UseReducer,
    },
    {
        id: 'use-context',
        title: 'useContext',
        category: 'Context',
        component: UseContext,
    },
    {
        id: 'use-ref',
        title: 'useRef',
        category: 'Ref',
        component: UseRef,
    },
    {
        id: 'use-imperative-handle',
        title: 'useImperativeHandle',
        category: 'Ref',
        component: UseImperativeHandle,
    },
    {
        id: 'use-effect',
        title: 'useEffect',
        category: 'Effect',
        component: UseEffect,
    },
    {
        id: 'use-layout-effect',
        title: 'useLayoutEffect',
        category: 'Effect',
        component: UseLayoutEffect,
    },
    {
        id: 'use-effect-event',
        title: 'useEffectEvent',
        category: 'Effect',
        component: UseEffectEvent,
    },
    {
        id: 'use-insertion-effect',
        title: 'useInsertionEffect',
        category: 'Effect',
        component: UseInsertionEffect,
    },
    {
        id: 'use-memo',
        title: 'useMemo',
        category: 'Performance',
        component: UseMemo,
    },
    {
        id: 'use-callback',
        title: 'useCallback',
        category: 'Performance',
        component: UseCallback,
    },
    {
        id: 'use-transition',
        title: 'useTransition',
        category: 'Performance',
        component: UseTransition,
    },
    {
        id: 'use-deferred-value',
        title: 'useDeferredValue',
        category: 'Performance',
        component: UseDeferredValue,
    },
    {
        id: 'use-id',
        title: 'useId',
        category: 'Library Authors',
        component: UseId,
    },
    {
        id: 'use-debug-value',
        title: 'useDebugValue',
        category: 'Library Authors',
        component: UseDebugValue,
    },
    {
        id: 'use-sync-external-store',
        title: 'useSyncExternalStore',
        category: 'Library Authors',
        component: UseSyncExternalStore,
    },
    {
        id: 'use-hook',
        title: 'use',
        category: 'React 19',
        component: UseHook,
    },
    {
        id: 'use-action-state',
        title: 'useActionState',
        category: 'React 19',
        component: UseActionState,
    },
    {
        id: 'use-optimistic',
        title: 'useOptimistic',
        category: 'React 19',
        component: UseOptimistic,
    },
];
