//@flow
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View
} from 'react-native';

const Spinner = ({ size }: { size: number | "large" | "small" }) => (
    <View style={styles.spinnerStyle}>
        <ActivityIndicator size={size || 'large'} />
    </View>
);

const styles = StyleSheet.create({
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export { Spinner };
