export function errorMessage(error: unknown): string {
    if (!error) return '';

    // Offline / no network
    if (error instanceof TypeError &&
        (error.message === 'Network request failed' || error.message === 'Failed to fetch')) {
        return 'No internet connection. Please check your network and try again.';
    }

    // Timeout
    if (error instanceof Error && error.message.toLowerCase().includes('timeout')) {
        return 'The request timed out. Please try again.';
    }

    // HTTP status codes 
    if (typeof error === 'object' && error !== null && 'status' in error) {
        const status = (error as { status: number }).status;
        if (status >= 500) return 'Server error. Please try again in a moment.';
        if (status === 404) return 'The requested content could not be found.';
        if (status === 403) return "You don't have permission to view this.";
        if (status === 401) return 'Your session has expired. Please log in again.';
    }

    // Already a plain string=
    if (typeof error === 'string') return error;

    // Known Error object with a reasonable message
    if (error instanceof Error && error.message) {
        return error.message;
    }

    return 'Something unexpected happened. Please try again.';
}