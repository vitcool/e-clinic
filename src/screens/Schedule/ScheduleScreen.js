import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ListItem, List } from 'react-native-elements';
import _ from 'lodash';

export default class ScheduleScreen extends React.Component {
  generateList = prescriptionsList => {
    const result = [];
    _.map(prescriptionsList, item => {
      for (let i = 0; i < item.time.length; i++) {
        result.push({ ...item, time: item.time[i] });
      }
    });
    const orderedResult = _.map(_.orderBy(result, ['time'], ['asc']), item => {
      return { ...item, time: `${item.time}:00` };
    });
    return orderedResult;
  };
  render() {
    const { prescriptionsList } = this.props;
    const prescription = this.generateList(prescriptionsList);
    return (
      <View>
        <List>
          {_.map(prescription, l => (
            <ListItem
              key={l.title}
              title={l.title}
              subtitle={`${l.time} - ${l.doze}`}
            />
          ))}
        </List>
      </View>
    );
  }
}

ScheduleScreen.propTypes = {
  prescriptionsList: PropTypes.array
};
