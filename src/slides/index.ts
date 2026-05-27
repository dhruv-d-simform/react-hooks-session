import type { ComponentType } from 'react';
import Intro from './intro';
import ClassComponents from './class-components';

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
        title: 'Class Components & Hooks',
        category: 'Foundations',
        component: ClassComponents,
    },
];
