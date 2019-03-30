import React, { Component } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { content } from "../helpers/contentful";
import { ActivityIndicator, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { NavigationScreenProp, NavigationState } from "react-navigation";

import colors from "../utils/colors";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface IState {
  entry: Recipe;
  isLoading: boolean;
}

type Recipe = {
  heading: string;
  image: any;
  ingredients: string[];
  fullText: string[];
};

export default class SearchScreen extends Component<Props, IState> {
  state = {
    isLoading: true,
    entry: {} as Recipe
  };

  componentDidMount() {
    const id = this.props.navigation.getParam("id", "7rQP3NpRz40gKmalq7lBjA");
    content(id)
      .then((entry: any) => this.setState({ entry, isLoading: false }))
      .catch(e => {
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
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon size={16} name="arrowleft" />
          Back to the list
        </Button>
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
    color: "#3f2d20",
    paddingLeft: 16,
    paddingTop: 16,
    fontWeight: "500"
  },
  fullText: {
    padding: 16
  },
  ingredientList: { paddingLeft: 8 },
  ingredient: {
    backgroundColor: "#f5fae5",
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
