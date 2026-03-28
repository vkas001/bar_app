import { useCallback, useState } from 'react';

export function useScreenRefresh(onFetch?: () => Promise<void>) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await onFetch?.();
        } finally {
            setRefreshing(false);
        }
    }, [onFetch]);

    return {
        refreshing,
        onRefresh,
    };
}