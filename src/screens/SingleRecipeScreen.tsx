import React, { Component } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { getRecipe } from "../helpers/contentful";
import { ActivityIndicator, Button } from "react-native-paper";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import Icon from "react-native-vector-icons/AntDesign";

import colors from "../utils/colors";
import { Recipe } from "../utils/types";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface IState {
  entry: Recipe;
  isLoading: boolean;
}

export default class SearchScreen extends Component<Props, IState> {
  state = {
    isLoading: true,
    entry: {} as Recipe
  };

  componentDidMount() {
    const id = this.props.navigation.getParam("id", "7rQP3NpRz40gKmalq7lBjA");
    getRecipe(id)
      .then((entry: any) => this.setState({ entry, isLoading: false }))
      .catch((e: Error) => {
        console.error(e);
        this.setState({ isLoading: false });
      });
  }

  getFullText() {
    return <Text style={styles.fullText}>{this.state.entry.fullText}</Text>;
  }

  _keyExtractor = (item: string) => item;

  ingredientsList() {
    const { entry } = this.state;
    return (
      <FlatList
        style={styles.ingredientList}
        horizontal
        data={entry.ingredients}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => (
          <Text style={styles.ingredient} key={item}>
            {item}
          </Text>
        )}
      />
    );
  }

  render() {
    const { entry, isLoading } = this.state;
    return (
      <View>
        {/* <Button
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon size={16} name="arrowleft" />
          Back to the list
        </Button> */}
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            color={colors.slimeGreen}
          />
        ) : (
          <>
            {this.ingredientsList()}
            <Image style={styles.image} source={entry.image} />
            <Text style={styles.heading}>{entry.heading}</Text>
            {this.getFullText()}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    color: colors.camoGreen,
    paddingLeft: 16,
    paddingTop: 16,
    fontWeight: "500"
  },
  fullText: {
    padding: 16
  },
  ingredientList: { paddingLeft: 8 },
  ingredient: {
    backgroundColor: colors.offWhite,
    padding: 8,
    marginTop: 8,
    marginLeft: 8,
    borderColor: colors.slimeGreen,
    borderWidth: 1,
    borderRadius: 4,
    color: colors.slimeGreen
  },
  image: {
    width: "100%",
    height: 250,
    marginTop: 16
  },
  button: {
    marginTop: 8,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  }
});
