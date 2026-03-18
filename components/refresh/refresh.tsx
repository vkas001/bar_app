import { useCallback, useState } from 'react';

export function useScreenRefresh(refreshDelay = 900) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), refreshDelay);
    }, [refreshDelay]);

    return {
        refreshing,
        onRefresh,
    };
}