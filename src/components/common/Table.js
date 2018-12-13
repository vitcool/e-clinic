import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel } from 'react-native-elements';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Text } from './Text';
import { Input } from './Input';
import { Button } from './Button';

class Table extends Component {
  renderRow(data) {
    const { allowEdit, onItemChange, tableStyle } = this.props;
    const { title, id, doze, interval } = data;
    return (
      <View style={{ flexDirection: 'row', ...tableStyle }} key={id}>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          {allowEdit ? (
            <Input
              value={title}
              name="title"
              onChangeText={text => onItemChange(text, 'title', id)}
            />
          ) : (
            <Text>{title}</Text>
          )}
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          {allowEdit ? (
            <Input
              value={doze}
              name="doze"
              onChangeText={text => onItemChange(text, 'doze', id)}
            />
          ) : (
            <Text>{doze}</Text>
          )}
        </View>
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          {allowEdit ? (
            <Input
              value={interval}
              name="interval"
              onChangeText={text => onItemChange(text, 'interval', id)}
            />
          ) : (
            <Text>{interval}</Text>
          )}
        </View>
      </View>
    );
  }

  render() {
    const { label, data, style, allowEdit, onAddPillPress } = this.props;
    return (
      <View style={style}>
        {label && <FormLabel>{label}</FormLabel>}
        <View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <View style={{ flex: 1 }}>
              <Text>Pills title</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Doze</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Times per day</Text>
            </View>
          </View>
          {_.map(data, datum => this.renderRow(datum))}
          {allowEdit && (
            <Button
              onPress={onAddPillPress}
              title="Add pill"
              style={{ marginTop: 10 }}
            />
          )}
        </View>
      </View>
    );
  }
}

Table.propTypes = {
  label: PropTypes.string,
  tableStyle: PropTypes.object,
  allowEdit: PropTypes.bool,
  data: PropTypes.array,
  style: PropTypes.object,
  onAddPillPress: PropTypes.func,
  onItemChange: PropTypes.func
};

export { Table };
