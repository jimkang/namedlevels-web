var test = require('tape');
var sanitizeClassSegment = require('../sanitize-class-segment');

test('Extra spaces', function extraSpaces(t) {
  t.plan(1);
  t.equal(sanitizeClassSegment('   asdf  '), 'asdf', 'Extra space is removed.');
});

test('Crazy characters', function crazyChars(t) {
  t.plan(1);

  t.equal(
    sanitizeClassSegment('sdf123%%sdf@///df\\~point_-=@'),
    'sdf123sdfdfpoint_-',
    'Only a subset of characters pass.'
  );
});

test('Compound words', function compound(t) {
  t.plan(1);
  t.equal(
    sanitizeClassSegment('  Bonus Cat '),
    'Bonus Cat',
    'Compound words are OK.'
  );
});

test('Handle null', function handleNull(t) {
  t.plan(3);
  t.doesNotThrow(runNullTests);

  function runNullTests() {
    t.equal(sanitizeClassSegment(null), null, 'Returns null when given null.');
    t.equal(
      sanitizeClassSegment(undefined),
      undefined,
      'Returns undefined when given null.'
    );
  }
});

test('Allow periods', function periods(t) {
  t.plan(1);
  t.equal(sanitizeClassSegment('Dr. Wily'), 'Dr. Wily', 'Periods are OK.');
});
