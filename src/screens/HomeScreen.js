import React from 'react';
import { Container, Card, CardItem } from 'native-base';
import PropTypes from 'prop-types';

import { Input, Button } from './../components/common';

export default class HomeScreen extends React.Component {
  goToGreetingsPage = () => {
    const { navigation } = this.props;
    navigation.navigate('Greetings');
  };

  onNameChangedText = value => {
    const { nameUpdate } = this.props;
    nameUpdate(value);
  };

  render() {
    return (
      <Container>
        <Card>
          <CardItem>
            <Input
              placeholder="Type the name"
              label="Name"
              onChangeText={value => this.onNameChangedText(value)}
            />
          </CardItem>
          <Button onPress={this.goToGreetingsPage}>Go to next</Button>
        </Card>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object,
  nameUpdate: PropTypes.func 
}
