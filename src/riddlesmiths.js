import _ from 'lodash';
import diceutil from './diceutil';
import printf from 'printf';

class RiddleResult {
  constructor(tohit) {
    this.tohit = tohit;
    this.count = 0;
    this.success = 0;
    this.successReroll = 0;
    this.rerollUsed = 0;
  }
  
  countPossibility(die1, die2, die3) {
    this.count += 1;
    const best = Math.min(die1, die2);
    if (best >= this.tohit) {
      this.success += 1;
      this.successReroll += 1;
    } else if (Math.max(die1, die2) >= this.tohit) {
      const bestReroll = Math.min(Math.max(die1, die2), die3);
      this.rerollUsed += 1;
      if (bestReroll >= this.tohit) {
        this.successReroll += 1;
      }
    }
  }
  
  static headerRow() {
    return "to hit, % of blocking 1, % of blocking 1 with reroll, % times reroll used";
  }
  
  get row() {
    return printf('%d+, %d%%, %d%%, %d%%', this.tohit, 100 * this.success / this.count, 100 * this.successReroll / this.count, 100 * this.rerollUsed / this.count);
  }
}

const results = [];
_.range(2,7).forEach(tohit => {
  results.push(new RiddleResult(tohit));
});

diceutil.rollN(3, (die1, die2, die3) => {
  results.forEach(result => {
    result.countPossibility(die1, die2, die3);
  });
});

console.log(RiddleResult.headerRow());
results.forEach(result => {
  console.log(result.row);
})