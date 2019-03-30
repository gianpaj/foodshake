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
import { Button, Checkbox } from "react-native-paper";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ingredients = [
  {
    name: "fruits",
    icon: "food-apple",
    data: [
      {
        name: "pear"
      },
      {
        name: "apple"
      },
      {
        name: "mango"
      },
      {
        name: "strawberry"
      },
      {
        name: "lemon"
      },
      {
        name: "banana"
      }
    ]
  },
  {
    name: "vegetables",
    icon: "carrot",
    data: [
      {
        name: "carrot"
      },
      {
        name: "tomato"
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
      this.state.expanded[ingredient] = true;
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
      <List.Section>
        {ingredients.map(ingredientType => (
          <List.Accordion
            expanded={this.state.expanded[ingredientType.name]}
            key={ingredientType.name}
            onPress={this.onAccordionPress.bind(this, ingredientType.name)}
            title={ingredientType.name}
            left={props => (
              <Icon {...props} size={20} name={ingredientType.icon} />
            )}
          >
            {ingredientType.data.map(ingredient => (
              <List.Item
                key={ingredient.name}
                onPress={() => this.onIngredientPress(ingredient.name)}
                title={ingredient.name}
                right={({ color }) => (
                  <Checkbox
                    color={color}
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
        {this.renderAccordion()}
        <View style={{ alignSelf: "center" }}>
          <Button
            dark
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
