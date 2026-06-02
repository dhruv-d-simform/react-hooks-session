// Online status store
export function subscribeOnline(cb: () => void) {
    window.addEventListener('online', cb);
    window.addEventListener('offline', cb);
    return () => {
        window.removeEventListener('online', cb);
        window.removeEventListener('offline', cb);
    };
}
export function getOnlineSnapshot() {
    return navigator.onLine;
}

// Dark mode store
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
export function subscribeDarkMode(cb: () => void) {
    darkModeQuery.addEventListener('change', cb);
    return () => darkModeQuery.removeEventListener('change', cb);
}
export function getDarkModeSnapshot() {
    return darkModeQuery.matches;
}

// Window size store — cached snapshot so getSnapshot returns a stable reference
let cachedWindowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
};
export function subscribeWindowSize(cb: () => void) {
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
}
export function getWindowSizeSnapshot() {
    if (
        cachedWindowSize.width !== window.innerWidth ||
        cachedWindowSize.height !== window.innerHeight
    ) {
        cachedWindowSize = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }
    return cachedWindowSize;
}
