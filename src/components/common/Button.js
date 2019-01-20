import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

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
  },
});

const Button = ({ onPress, disabled, children }) => {
  const {
    buttonStyle, textStyle, disabledTextStyle, disabledViewStyle,
  } = styles;

  return (
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={[buttonStyle, disabled && disabledViewStyle]} >
            <Text style={[textStyle, disabled && disabledTextStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
