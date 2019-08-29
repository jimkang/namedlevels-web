var getMasterLevelHpGain = require('./get-master-level-hp-gain');
var getNameLevel = require('./get-name-level');
var getXPBrackets = require('./get-xp-brackets');

function profileToRows(profile, random) {
  var hd = profile.startingHD;
  var nameLevel = getNameLevel(profile);

  // Using global seedrandom assumed to be included by <script> tag because it
  // does not browserify well.

  if (!random && typeof Math.seedrandom === 'function') {
    random = new Math.seedrandom(profile.className.toLowerCase());
  }

  var xpBrackets = getXPBrackets(profile, random);

  function levelNameToRow(levelName, i) {
    return {
      name: levelName,
      levelNumber: i + 1,
      hd: getHitDiceForLevel(
        profile.startingHD,
        profile.hitDie,
        i + 1,
        nameLevel,
        profile.gainsHDForever
      ),
      xpRange: xpBrackets[i]
    };
  }

  return profile.levelNames.map(levelNameToRow);
}

function getHitDiceForLevel(
  startingHD,
  hitDieType,
  level,
  nameLevel,
  gainsHDForever
) {
  if (gainsHDForever) {
    return (startingHD + level - 1).toString();
  } else {
    var hd = (startingHD + Math.min(level, nameLevel) - 1).toString();
    var levelsPastNameLevel = level - nameLevel;
    if (levelsPastNameLevel > 0) {
      hd += '+' + getMasterLevelHpGain(hitDieType) * levelsPastNameLevel;
    }
    return hd;
  }
}

module.exports = profileToRows;
