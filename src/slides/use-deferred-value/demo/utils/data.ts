const ADJECTIVES = [
    'Crimson',
    'Golden',
    'Silent',
    'Rapid',
    'Frozen',
    'Electric',
    'Cosmic',
    'Velvet',
    'Iron',
    'Neon',
];

const NOUNS = [
    'Falcon',
    'River',
    'Engine',
    'Garden',
    'Photon',
    'Compass',
    'Harbor',
    'Lantern',
    'Summit',
    'Orchid',
];

const TAGS = ['React', 'TypeScript', 'CSS', 'Node.js', 'Testing'];

export const ITEMS = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `${ADJECTIVES[i % 10]} ${NOUNS[Math.floor(i / 10) % 10]} ${Math.floor(i / 100) + 1}`,
    tag: TAGS[i % 5],
}));

export function filterItems(query: string) {
    const q = query.toLowerCase();
    return ITEMS.filter(
        (item) =>
            item.name.toLowerCase().includes(q) ||
            item.tag.toLowerCase().includes(q)
    );
}
