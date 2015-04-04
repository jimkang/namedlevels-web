var test = require('tape');
var getXPBrackets = require('../get-xp-brackets');
var _ = require('lodash');
var seedrandom = require('seedrandom');

test('Generates XP brackets', function basicTest(t) {
  t.plan(1);
  
  var profile = {
    "className": "Microwave",
    "levelNames": [
      "Nuke",
      "Nuke (2nd level)",
      "Kitchen Appliance",
      "Kitchen Appliance (4th level)",
      "Nonparticulate Radiation",
      "Nonparticulate Radiation (6th level)",
      "Electromagnetic Wave",
      "Electromagnetic Wave (8th level)",
      "Electromagnetic Radiation",
      "Electromagnetic Radiation (10th level)",
      "Electromagnetic Radiation (11th level)",
      "Microwave",
      "Microwave of Diamonds",
      "Microwave of Hearts",
      "Microwave of Spades",
      "Microwave of Spades (16th level)",
      "High Microwave of Spades",
      "Grand Microwave of Spades",
      "The Number One Microwave of Spades",
      "The Number One Microwave of Spades (20th level)",
      "The Number One Microwave of Spades (21st level)"
    ],
    "hitDie": 4,
    "startingHD": 2,
    gainsHDForever: false
  };

  var expectedBrackets = [
    [
      1,
      2250
    ],
    [
      2251,
      5000
    ],
    [
      5001,
      11750
    ],
    [
      11751,
      27000
    ],
    [
      27001,
      62000
    ],
    [
      62001,
      124000
    ],
    [
      124001,
      248000
    ],
    [
      248001,
      496000
    ],
    [
      496001,
      640000
    ],
    [
      640001,
      835000
    ],
    [
      835001,
      1085000
    ],
    [
      1085001,
      1335000
    ],
    [
      1335001,
      1585000
    ],
    [
      1585001,
      1835000
    ],
    [
      1835001,
      2085000
    ],
    [
      2085001,
      2335000
    ],
    [
      2335001,
      2585000
    ],
    [
      2585001,
      2835000
    ],
    [
      2835001,
      3085000
    ],
    [
      3085001,
      3335000
    ],
    [
      3335001,
      3585000
    ]
  ];
  
  var brackets = getXPBrackets(
    profile, seedrandom(profile.className.toLowerCase())
  );

  t.deepEqual(brackets, expectedBrackets);
});

test('No step should be over 500K', function stepLimit(t) {
  t.plan(20);
  
  var profile = {
    "className": "Web Developer",
    "levelNames": [
      "placeholder", "placeholder", "placeholder", "placeholder", "placeholder",
      "placeholder", "placeholder", "placeholder", "placeholder", "placeholder",
      "Web Developer", "placeholder", "placeholder", "placeholder", "placeholder",
      "placeholder", "placeholder", "placeholder", "placeholder", "placeholder"
    ],
    "hitDie": 6,
    "startingHD": 1,
    gainsHDForever: false
  };

  var brackets = getXPBrackets(
    profile, seedrandom(profile.className.toLowerCase())
  );

  brackets.forEach(checkBracketSpanIsUnder500K);

  function checkBracketSpanIsUnder500K(bracket) {
    t.ok(bracket[1] - bracket[0] <= 500000, 
      'Every bracket is under 500K:' +  bracket[0] + ' to ' + bracket[1]
    );
  }
});
