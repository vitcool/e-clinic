import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';
import _ from 'lodash';

const ItemsList = ({ items, onItemPress, titleKey }) => {
  return (
    <List>
      {_.map(items, (item, id) => (
        <ListItem
          title={item[titleKey]}
          key={item[titleKey]}
          onPress={() => onItemPress({ ...item, id })}
        />
      ))}
    </List>
  );
};

ItemsList.propTypes = {
  items: PropTypes.object,
  onItemPress: PropTypes.func,
  titleKey: PropTypes.string
};

export { ItemsList };
