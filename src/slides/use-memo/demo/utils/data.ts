export const ITEMS = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    category: ['React', 'TypeScript', 'CSS', 'Node.js', 'Testing'][i % 5],
}));

export function expensiveFilter(items: typeof ITEMS, query: string) {
    const start = performance.now();
    while (performance.now() - start < 200); // artificial delay
    return items.filter(
        (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
    );
}
