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
  FlatList
} from "react-navigation";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Headline,
  Paragraph,
  Title
} from "react-native-paper";
import { getRecipiesByIngredients } from "../helpers/contentful";
import { Recipe } from "../utils/types";
import colors from "../utils/colors";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
  ingredients: Array<string>;
  isLoading: boolean;
  totalNum: number;
  recipes: Array<Recipe>;
}

export default class ResultsScreen extends Component<Props, State> {
  static navigationOptions = {
    title: "Delicious results"
  };
  state = {
    isLoading: true,
    ingredients: [],
    totalNum: -1,
    recipes: []
    // recipes: [
    //   {
    //     id: "7rQP3NpRz40gKmalq7lBjA",
    //     heading: "Single Recipe",
    //     fullText: [""],
    //     ingredients: [""],
    //     image: {
    //       uri:
    //         "https://images.ctfassets.net/prxwxwshz29c/3HZx6sX7LThaxCMhjSlDgO/20c47c2ba0f8abd5773b7eb67650c9a5/green-salad-with-mango-87358-1.jpeg"
    //     }
    //   }
    // ]
  };
  componentDidMount() {
    const ingredients = this.props.navigation.getParam("ingredients", [
      "cucumber"
    ]);
    getRecipiesByIngredients(ingredients)
      .then((recipes: any) => this.setState({ recipes, isLoading: false }))
      .catch((e: Error) => {
        console.error(e);
        this.setState({ isLoading: false });
      });
  }

  goToRecipe = (id: string) => this.props.navigation.navigate("Recipe", { id });

  renderCard = ({ item }: { item: Recipe }) => (
    <Card key={item._id} onPress={() => this.goToRecipe(item._id)}>
      <Card.Cover
        style={styles.cardContainer}
        source={{ uri: item.image.uri }}
      />
      <Card.Content>
        <Title>{item.heading}</Title>
        <Paragraph>You have 3 of 5 ingredients for this dish!</Paragraph>
      </Card.Content>
    </Card>
  );

  _keyExtractor = (item: Recipe) => item._id;

  render() {
    const { recipes, isLoading } = this.state;

    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.slimeGreen}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {recipes.length < 1 ? (
          <View>
            <Headline>No recipies found :(</Headline>
          </View>
        ) : (
          <FlatList
            keyExtractor={this._keyExtractor}
            data={recipes}
            renderItem={this.renderCard}
          />
        )}
        {/* <Button title="back" onPress={() => this.props.navigation.goBack()} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
});
