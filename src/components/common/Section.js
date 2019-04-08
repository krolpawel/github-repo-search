import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
});

const Section = ({ children, style }) => (
        <View style={[styles.containerStyle, style]}>
            {children}
        </View>
);

Section.propTypes = {
  children: PropTypes.node,
  style: PropTypes.any,//PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Section;
