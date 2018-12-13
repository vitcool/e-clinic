import _ from 'lodash';

const MIN_TIME = 6;
const MAX_TIME = 22;

export const generateSchedule = prescriptionsListArray => {
  const result = _.map(prescriptionsListArray, prescription => {
    const { title, doze } = prescription;
    return { time: getPillsTime(prescription), title, doze };
  });
  return result;
};

const getPillsTime = prescription => {
  const { interval } = prescription;
  switch (Number(interval)) {
    case 1: {
      return [(MAX_TIME - MIN_TIME) / 2];
    }
    case 2: {
      return [MIN_TIME + 2, MAX_TIME - 2];
    }
    default: {
      const timeOfbreak = Math.floor((MAX_TIME - MIN_TIME) / interval);
      let res = [];
      let startPoint = MIN_TIME;
      for (var i = 0; i < interval; i++) {
        startPoint += timeOfbreak;
        res.push(startPoint);
      }
      return res;
    }
  }
};
