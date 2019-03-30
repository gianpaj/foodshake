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
import { StyleSheet, View } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

import colors from "../utils/colors";

const ingredients = [
  {
    name: "Fruits",
    icon: "food-apple",
    data: [
      {
        name: "banana"
      },
      {
        name: "grapefruit"
      },
      {
        name: "lemon"
      },
      {
        name: "mango"
      },
      {
        name: "orange"
      },
      {
        name: "peach"
      },
      {
        name: "pear"
      },
      {
        name: "pineapple"
      },
      {
        name: "pomegranate"
      },
      {
        name: "strawberry"
      },
      {
        name: "watermelon"
      }
    ]
  },
  {
    name: "Vegetables",
    icon: "carrot",
    data: [
      {
        name: "artichoke"
      },
      {
        name: "asparagus"
      },
      {
        name: "bell pepper"
      },
      {
        name: "broccoli"
      },
      {
        name: "cabbage"
      },
      {
        name: "carrot"
      },
      {
        name: "cucumber"
      },
      {
        name: "mushroom"
      },
      {
        name: "potato"
      },
      {
        name: "pumpkin"
      },
      {
        name: "radish"
      },
      {
        name: "salad"
      },
      {
        name: "tomato"
      },
      {
        name: "zucchini"
      }
    ]
  },
  {
    name: "Grains",
    icon: "food-croissant",
    data: [
      {
        name: "bread"
      },
      {
        name: "cookies"
      }
    ]
  },
  {
    name: "Dairy",
    icon: "cow",
    data: [
      {
        name: "cheese"
      },
      {
        name: "milk"
      }
    ]
  },
  {
    name: "Sea food",
    icon: "food-croissant",
    data: [
      {
        name: "crab"
      },
      {
        name: "shrimp"
      },
      {
        name: "lobster"
      },
      {
        name: "oyster"
      }
    ]
  }
];

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
interface State {
  expanded: any;
  checkedIngredients: Map<any, any>;
}
export default class SearchScreen extends Component<Props, State> {
  static navigationOptions = {
    title: "Choose your ingredients"
  };

  constructor(props: Props) {
    super(props);

    const ingredientTypes = ingredients.map(i => i.name);

    this.state = {
      expanded: {},
      checkedIngredients: new Map()
    };
    // generate object with each ingredient type as key
    // e.g. { expanded: { fruits: true, vegetables: true } };
    ingredientTypes.forEach(ingredient => {
      this.state.expanded[ingredient] = false;
    });
    // console.warn(this.state);
  }

  onAccordionPress = (key: string) =>
    this.setState(prevState => ({
      expanded: {
        ...prevState.expanded,
        [key]: !prevState.expanded[key]
      }
    }));

  onIngredientPress = (key: string) => {
    const { checkedIngredients } = this.state;
    this.setState(prevState => ({
      checkedIngredients: prevState.checkedIngredients.set(
        key,
        !checkedIngredients.get(key)
      )
    }));
  };

  renderAccordion() {
    const { checkedIngredients } = this.state;

    return (
      <List.Section style={{ flex: 1 }}>
        {ingredients.map(ingredientType => (
          <List.Accordion
            expanded={this.state.expanded[ingredientType.name]}
            key={ingredientType.name}
            onPress={this.onAccordionPress.bind(this, ingredientType.name)}
            title={ingredientType.name}
            theme={{
              colors: {
                primary: colors.greyishBrown,
                text: colors.greyishBrown
              }
            }}
            left={() => <Icon size={20} name={ingredientType.icon} />}
          >
            {ingredientType.data.map(ingredient => (
              <List.Item
                key={ingredient.name}
                onPress={() => this.onIngredientPress(ingredient.name)}
                title={`${ingredient.name[0].toUpperCase()}${ingredient.name.slice(
                  1
                )}`}
                right={() => (
                  <Checkbox.Android
                    color={colors.slimeGreen}
                    status={
                      checkedIngredients.get(ingredient.name)
                        ? "checked"
                        : "unchecked"
                    }
                  />
                )}
              />
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    );
  }

  goToResultsScreen = () => {
    this.props.navigation.navigate("Results", {
      ingredients: mapToArrayOfStrings(this.state.checkedIngredients)
    });
  };

  render() {
    return (
      <>
        {/* <View style={styles.container}>
          <Text style={styles.instructions}>To get started, edit App.tsx</Text>
          <Button
            title="Go to Details"

          />
        </View> */}
        <ScrollView>{this.renderAccordion()}</ScrollView>
        <View
          style={{
            alignSelf: "center",
            height: 62,
            justifyContent: "center"
          }}
        >
          <Button
            dark
            disabled={
              mapToArrayOfStrings(this.state.checkedIngredients).length < 1
            }
            onPress={this.goToResultsScreen}
            contentStyle={{ width: 221, height: 48 }}
            style={{ elevation: 0 }}
            mode="contained"
          >
            Search
          </Button>
        </View>
      </>
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
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

function mapToArrayOfStrings(strMap: Map<any, any>) {
  const arr = [];
  for (let [k, v] of strMap) {
    if (v) arr.push(k);
  }
  return arr;
}
