//@flow
import React from "react";
import {
  StyleSheet,
  View
} from "react-native";

const Screen = (props: { children: React.Component<> }) => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0
  }
});

export { Screen };
