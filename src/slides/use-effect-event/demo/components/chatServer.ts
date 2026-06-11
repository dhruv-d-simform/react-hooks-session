type Callbacks = {
    onConnect: () => void;
    onDisconnect: () => void;
};

export function connectToRoom(
    _roomId: string,
    callbacks: Callbacks
): () => void {
    const timeout = setTimeout(callbacks.onConnect, 80);
    return () => {
        clearTimeout(timeout);
        callbacks.onDisconnect();
    };
}
