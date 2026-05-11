const FALLBACK_API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

let currentApiBaseUrl = FALLBACK_API_BASE_URL;

const listeners = new Set<(baseUrl: string) => void>();

function normalizeBaseUrl(baseUrl?: string | null) {
    return baseUrl?.trim() ?? "";
}

function emitBaseUrlChange(baseUrl: string) {
    for (const listener of listeners) {
        listener(baseUrl);
    }
}

export function getApiBaseUrl() {
    return currentApiBaseUrl;
}

export function setApiBaseUrl(baseUrl?: string | null) {
    currentApiBaseUrl = normalizeBaseUrl(baseUrl) || FALLBACK_API_BASE_URL;
    emitBaseUrlChange(currentApiBaseUrl);
    return currentApiBaseUrl;
}

export function subscribeApiBaseUrl(listener: (baseUrl: string) => void) {
    listeners.add(listener);
    listener(currentApiBaseUrl);

    return () => {
        listeners.delete(listener);
    };
}