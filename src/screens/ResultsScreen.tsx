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

interface State {
  ingredients: Array<string>;
  recipes: Array<{
    id: string;
    heading: string;
    fullText: Array<string>;
    ingredients: Array<string>;
    image: {
      uri: string;
    };
  }>;
}
export default class ResultsScreen extends Component<Props, State> {
  static navigationOptions = {
    title: "Delicious results"
  };
  state = {
    ingredients: [],
    // recipes: []
    recipes: [
      {
        id: "7rQP3NpRz40gKmalq7lBjA",
        heading: "Single Recipe",
        fullText: [""],
        ingredients: [""],
        image: {
          uri:
            "https://images.ctfassets.net/prxwxwshz29c/3HZx6sX7LThaxCMhjSlDgO/20c47c2ba0f8abd5773b7eb67650c9a5/green-salad-with-mango-87358-1.jpeg"
        }
      }
    ]
  };
  componentDidMount() {
    const ingredients = this.props.navigation.getParam("ingredients", [
      "carrots"
    ]);
    this.setState({ ingredients });
    // console.warn(ingredients);
  }

  goToRecipe = (id: string) => this.props.navigation.navigate("Recipe", { id });

  render() {
    const { recipes } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {recipes.map((recipe, i) => (
            <Card key={i} onPress={() => this.goToRecipe(recipe.id)}>
              <Card.Title
                title={recipe.heading}
                subtitle="Card Subtitle"
                left={props => <Avatar.Icon {...props} icon="folder" />}
              />
              <Card.Cover source={{ uri: recipe.image.uri }} />
              <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
              </Card.Content>
            </Card>
          ))}
          {/* <Button title="back" onPress={() => this.props.navigation.goBack()} /> */}
        </ScrollView>
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
