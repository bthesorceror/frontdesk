var _ = require('underscore');

function FrontDesk(max) {
  this.max = max;
  this.ledger = {};
}

FrontDesk.prototype.checkin = function(key) {
  if (this.max && this.ledger[key] >= this.max)
    return false;

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

FrontDesk.prototype.evacuate = function() {
  this.ledger = {};
}

module.exports = FrontDesk;
