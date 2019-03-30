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
import {
  NavigationScreenProp,
  NavigationState,
  ScrollView
} from "react-navigation";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
export default class ResultsScreen extends Component<Props> {
  componentDidMount() {
    const { navigation } = this.props;
    const ingredients = navigation.getParam("ingredients", []);
    console.warn(ingredients);
  }

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
    // alignItems: "center",
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
