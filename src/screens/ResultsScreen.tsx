/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
export default class ResultsScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>ResultsScreen</Text>
        <Button title="back" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
