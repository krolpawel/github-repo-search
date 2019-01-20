import { PropTypes } from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
  },
});

const Screen = ({ children }) => <View style={styles.containerStyle}>{children}</View>;

Screen.propTypes = {
  children: PropTypes.node,
};

export default Screen;
