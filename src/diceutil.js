import _ from 'lodash';

/**
 * Iterate over each possible combination of diceCount dice, calling callback with each combination
 */
function rollN(diceCount, callback) {
  if (diceCount <= 0) {
    callback();
  } else {
    _.range(1,7).forEach(die => {
      rollN(diceCount - 1, _.partial(callback, die));
    });
  }
  
}

export default {
  rollN
};