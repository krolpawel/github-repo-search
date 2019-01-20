import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


const Spinner = ({ size }) => (
    <View style={styles.spinnerStyle}>
        <ActivityIndicator size={size || 'large'} />
    </View>
);

Spinner.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'small',
      'large',
    ]),
  ]),
};

export default Spinner;
