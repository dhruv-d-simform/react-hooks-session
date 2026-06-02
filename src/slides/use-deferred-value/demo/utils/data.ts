export const ITEMS = Array.from({ length: 3000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    tag: ['React', 'TypeScript', 'CSS', 'Node.js', 'Testing'][i % 5],
}));
