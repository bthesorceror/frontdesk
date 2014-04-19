var test      = require('tape');
var FrontDesk = require('../index.js');

test('can create a new frontdesk', function(t) {
  t.plan(1);

  var frontdesk = new FrontDesk();

  t.ok(frontdesk);
});

test('can checkin a room', function(t) {
  t.plan(2);

  var frontdesk = new FrontDesk();
  t.ok(frontdesk.checkin('key'));

  t.ok(frontdesk.isOccupied('key'));
});

test('can checkin to a room a max number of times', function(t) {
  t.plan(3);

  var frontdesk = new FrontDesk(1);
  frontdesk.checkin('key');
  frontdesk.checkin('key');

  t.ok(frontdesk.isOccupied('key'));

  t.ok(frontdesk.checkout('key'));

  t.notOk(frontdesk.isOccupied('key'));
});

test('can checkout of a room', function(t) {
  t.plan(3);

  var frontdesk = new FrontDesk();
  frontdesk.checkin('key');

  t.ok(frontdesk.isOccupied('key'));

  t.ok(frontdesk.checkout('key'));

  t.notOk(frontdesk.isOccupied('key'));
});

test('cannot checkout of a empty room', function(t) {
  t.plan(1);

  var frontdesk = new FrontDesk();
  t.notOk(frontdesk.checkout('key'));
});

test('cannot checkout of an evacuated room', function(t) {
  t.plan(4);

  var frontdesk = new FrontDesk();

  frontdesk.checkin('key');

  t.ok(frontdesk.isOccupied('key'));
  t.ok(frontdesk.checkout('key'));
  t.notOk(frontdesk.isOccupied('key'));
  t.notOk(frontdesk.checkout('key'));
});
