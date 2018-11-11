import React from 'react';
import { Container, Card, CardItem } from 'native-base';
import PropTypes from 'prop-types';

import { Text } from './../components/common';

export default class LinksScreen extends React.Component {
  renderText = () => {
    const { name } = this.props;
    return `Hello, ${name}!`;
  };

  render() {
    return (
      <Container>
        <Card>
          <CardItem>
            <Text>{this.renderText()}</Text>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

LinksScreen.propTypes = {
  name: PropTypes.string
};
