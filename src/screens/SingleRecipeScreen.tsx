import React, { Component } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { content } from '../helpers/contentful';

interface IState {
  heading: string;
  image: any;
  ingredients: string[];
  fullText: string[];
}

export default class SearchScreen extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      heading: 'Single Recipe',
      fullText: [''],
      ingredients: [''],
      image: {
        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      },
    };
  }
  text = 'Single Recipe';
  componentDidMount() {
    content().then((entry: any) => {
      const uri = entry.fields.image.fields.file.url;
      this.setState({
        heading: entry.fields.name,
        fullText: entry.fields.fullText.content.map((p:any) => p.content[0].value),
        ingredients: entry.fields.ingredients.map((ingr:any) => ingr.fields.name),
        image: {
          uri: `https:${uri}`,
        },
      });
    });
  }
  getFullText() {
    return <Text>{this.state.fullText}</Text>;
  }
  ingredientsList() {
    return <FlatList
    data={this.state.ingredients}
    renderItem={({item}) => <Text>{item}</Text>}
  />
  }
  render() {
    return (
      <View>
        <Image style={{ width: '100%', height: 250 }} source={this.state.image} />
        <Text>{this.state.heading}</Text>
        {this.getFullText()}
        {this.ingredientsList()}
      </View>
    );
  }
}
