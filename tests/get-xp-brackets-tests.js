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
      1300000
    ],
    [
      1300001,
      1560000
    ],
    [
      1560001,
      1870000
    ],
    [
      1870001,
      2180000
    ],
    [
      2180001,
      2490000
    ],
    [
      2490001,
      2800000
    ],
    [
      2800001,
      3110000
    ],
    [
      3110001,
      3420000
    ],
    [
      3420001,
      3730000
    ],
    [
      3730001,
      4040000
    ]
  ];

  var brackets = getXPBrackets(
    profile, seedrandom(profile.className.toLowerCase())
  );

  t.deepEqual(brackets, expectedBrackets);
});
