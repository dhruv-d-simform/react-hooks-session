import type { ComponentType } from 'react';
import Intro from './intro';
import BeforeHooks from './before-hooks';
import AllHooks from './all-hooks';

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
];
