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

import SearchScreen from "./screens/SearchScreen";
import ResultsScreen from "./screens/ResultsScreen";
import colors from "./utils/colors";
import theme from "./theme";

const RootStack = createStackNavigator(
  {
    Search: SearchScreen,
    Results: ResultsScreen
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

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    );
  }
}
