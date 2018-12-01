//@flow
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

type PropsType = {
    onPress: Function,
    disabled: boolean,
    children: any
}
const Button = ({ onPress, disabled, children }: PropsType) => {
    const { buttonStyle, textStyle, disabledTextStyle, disabledViewStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={[buttonStyle, disabled && disabledViewStyle]} disabled={disabled}>
            <Text style={[textStyle, disabled && disabledTextStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 14,
        fontWeight: '600',
        padding: 5,
    },
    buttonStyle: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
    },
    disabledViewStyle: {
        borderColor: '#888',
    },
    disabledTextStyle: {
        color: '#888',
    }
});

export { Button };
