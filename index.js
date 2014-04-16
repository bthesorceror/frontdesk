var _ = require('underscore');

function FrontDesk() {
  this.ledger = {};
}

FrontDesk.prototype.checkin = function(key) {
  if (_.isNumber(this.ledger[key])) {
    this.ledger[key] += 1;
  } else {
    this.ledger[key] = 1;
  }
  return true;
}

FrontDesk.prototype.checkout = function(key) {
  if (!this.ledger[key]) return false;
  this.ledger[key] -= 1;
  return true;
}

FrontDesk.prototype.isOccupied = function(key) {
  return this.ledger[key] > 0;
}

module.exports = FrontDesk;
