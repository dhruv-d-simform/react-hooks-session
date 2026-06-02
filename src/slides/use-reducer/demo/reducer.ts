export type Product = {
    id: number;
    name: string;
    emoji: string;
    price: number;
};
export type CartItem = Product & { qty: number };
export type State = { items: CartItem[] };
export type Action =
    | { type: 'ADD'; product: Product }
    | { type: 'REMOVE'; id: number }
    | { type: 'CLEAR' };

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD': {
            const existing = state.items.find(
                (i) => i.id === action.product.id
            );
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === action.product.id
                            ? { ...i, qty: i.qty + 1 }
                            : i
                    ),
                };
            }
            return {
                items: [...state.items, { ...action.product, qty: 1 }],
            };
        }
        case 'REMOVE':
            return { items: state.items.filter((i) => i.id !== action.id) };
        case 'CLEAR':
            return { items: [] };
    }
}
