var test = require('tape');
var profileToRows = require('../profile-to-rows');
var _ = require('lodash');

test('Converts a profile into rows of objects', function rows(t) {
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
    "startingHD": 2
  };

  var expectedRows = [
    {
      "name": "Nuke",
      "levelNumber": 1,
      "hd": "2",
      // "xpRange": "0-1000"
    },
    {
      "name": "Nuke (2nd level)",
      "levelNumber": 2,
      "hd": "3",
      // "xpRange": "0-2000"
    },
    {
      "name": "Kitchen Appliance",
      "levelNumber": 3,
      "hd": "4",
      // "xpRange": "0-1000"
    },
    {
      "name": "Kitchen Appliance (4th level)",
      "levelNumber": 4,
      "hd": "5",
      // "xpRange": "0-1000"
    },
    {
      "name": "Nonparticulate Radiation",
      "levelNumber": 5,
      "hd": "6",
      // "xpRange": "0-1000"
    },
    {
      "name": "Nonparticulate Radiation (6th level)",
      "levelNumber": 6,
      "hd": "7",
      // "xpRange": "0-1000"
    },
    {
      "name": "Electromagnetic Wave",
      "levelNumber": 7,
      "hd": "8",
      // "xpRange": "0-1000"
    },
    {
      "name": "Electromagnetic Wave (8th level)",
      "levelNumber": 8,
      "hd": "9",
      // "xpRange": "0-1000"
    },
    {
      "name": "Electromagnetic Radiation",
      "levelNumber": 9,
      "hd": "10",
      // "xpRange": "0-1000"
    },
    {
      "name": "Electromagnetic Radiation (10th level)",
      "levelNumber": 10,
      "hd": "11",
      // "xpRange": "0-1000"
    },
    {
      "name": "Electromagnetic Radiation (11th level)",
      "levelNumber": 11,
      "hd": "12",
      // "xpRange": "0-1000"
    },
    {
      "name": "Microwave",
      "levelNumber": 12,
      "hd": "13",
      // "xpRange": "0-1000"
    },
    {
      "name": "Microwave of Diamonds",
      "levelNumber": 13,
      "hd": "13+1",
      // "xpRange": "0-1000"
    },
    {
      "name": "Microwave of Hearts",
      "levelNumber": 14,
      "hd": "13+2",
      // "xpRange": "0-1000"
    },
    {
      "name": "Microwave of Spades",
      "levelNumber": 15,
      "hd": "13+3",
      // "xpRange": "0-1000"
    },
    {
      "name": "Microwave of Spades (16th level)",
      "levelNumber": 16,
      "hd": "13+4",
      // "xpRange": "0-1000"
    },
    {
      "name": "High Microwave of Spades",
      "levelNumber": 17,
      "hd": "13+5",
      // "xpRange": "0-1000"
    },
    {
      "name": "Grand Microwave of Spades",
      "levelNumber": 18,
      "hd": "13+6",
      // "xpRange": "0-1000"
    },
    {
      "name": "The Number One Microwave of Spades",
      "levelNumber": 19,
      "hd": "13+7",
      // "xpRange": "0-1000"
    },
    {
      "name": "The Number One Microwave of Spades (20th level)",
      "levelNumber": 20,
      "hd": "13+8",
      // "xpRange": "0-1000"
    },
    {
      "name": "The Number One Microwave of Spades (21st level)",
      "levelNumber": 21,
      "hd": "13+9",
      // "xpRange": "0-1000"
    }
  ];

  t.plan(expectedRows.length);

  var rows = profileToRows(profile);

  expectedRows.forEach(checkRow);

  function checkRow(expected, i) {
    t.deepEqual(rows[i], expected, 'Row is as expected');
  }
});

test('Respects gainsHDForever', function hdForever(t) {  
  var profile = {
    "className": "Vole",
    "pluralOfName": "Voles",
    "levelNames": [
      "Microtus Ochrogaster",
      "Microtus Richardsoni",
      "Arvicola Amphibius",
      "Prairie Vole",
      "Grasshopper Mouse",
      "Red-Backed Mouse",
      "Redback Vole",
      "Microtus Pennsylvaticus",
      "Meadow Vole",
      "Richardson Vole",
      "Richardson Vole (11th level)",
      "Richardson Vole (12th level)",
      "Vole",
      "Vole Knight",
      "Vole Lord",
      "Vole Supreme",
      "Vole Supreme (17th level)",
      "High Vole Supreme",
      "Principal Vole Supreme",
      "The Great Vole Supreme",
      "The Great Vole Supreme (21st level)",
      "The Great Vole Supreme (22nd level)"
    ],
    "hitDie": 4,
    "startingHD": 2,
    "gainsHDForever": true
  };

  t.plan(profile.levelNames.length);

  var results = profileToRows(profile);
  var resultHDs = _.pluck(results, 'hd');

  resultHDs.forEach(checkHD);

  function checkHD(resultHD, i) {
    t.equal(resultHD, (i + 2).toString(), 'HD for level ' + i + ' is correct.');
  }
});
