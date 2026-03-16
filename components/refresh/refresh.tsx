import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

const ScrollToRefreshFlatList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        // Simulate fetching new data
        setTimeout(() => {
            setItems(prev => [`New Item ${prev.length + 1}`, ...prev]);
            setRefreshing(false);
        }, 1500);
    }, []);

    return (
        <FlatList
            data={items}
            keyExtractor={item => item}
            renderItem={({ item }) => (
                <View className="p-4 mb-2 bg-gray-200 rounded-lg mx-4">
                    <Text className="text-gray-800">{item}</Text>
                </View>
            )}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    );
};

export default ScrollToRefreshFlatList;