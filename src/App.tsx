/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ThemeProvider } from "react-native-elements";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import SearchScreen from "./screens/SearchScreen";
import ResultsScreen from "./screens/ResultsScreen";
import SingleRecipeScreen from "./screens/SingleRecipeScreen";
import colors from "./utils/colors";
import theme from "./theme";

const RootStack = createStackNavigator(
  {
    Search: SearchScreen,
    Results: ResultsScreen,
    Recipe: SingleRecipeScreen
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.secondary2
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppContainer = createAppContainer(RootStack);

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.slimeGreen,
    // background: colors.slimeGreen,
    text: colors.greyishBrown
  },
  roundness: 50
};

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <PaperProvider theme={paperTheme}>
          <AppContainer />
        </PaperProvider>
      </ThemeProvider>
    );
  }
}
