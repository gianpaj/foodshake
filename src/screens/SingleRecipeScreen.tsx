import React, { Component } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { content } from "../helpers/contentful";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface IState {
  heading: string;
  image: any;
  ingredients: string[];
  fullText: string[];
}

export default class SearchScreen extends Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      heading: "Single Recipe",
      fullText: [""],
      ingredients: [""],
      image: {
        uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"
      }
    };
  }
  text = "Single Recipe";

  componentDidMount() {
    content().then((entry: any) => {
      const uri = entry.fields.image.fields.file.url;
      this.setState({
        heading: entry.fields.name,
        fullText: entry.fields.fullText.content.map(
          (p: any) => p.content[0].value
        ),
        ingredients: entry.fields.ingredients.map(
          (ingr: any) => ingr.fields.name
        ),
        image: {
          uri: `https:${uri}`
        }
      });
    });
  }

  getFullText() {
    return <Text style={styles.fullText}>{this.state.fullText}</Text>;
  }

  ingredientsList() {
    return (
      <FlatList
        style={styles.ingredientList}
        horizontal
        data={this.state.ingredients}
        renderItem={({ item }) => (
          <Text style={styles.ingredient} key={item}>
            {item}
          </Text>
        )}
      />
    );
  }

  render() {
    return (
      <View>
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon size={16} name={"arrowleft"} />
          Back to the list
        </Button>
        {this.ingredientsList()}
        <Image style={styles.image} source={this.state.image} />
        <Text style={styles.heading}>{this.state.heading}</Text>
        {this.getFullText()}
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
    borderColor: "#9cd400",
    borderWidth: 1,
    borderRadius: 4,
    color: "#9cd400"
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
