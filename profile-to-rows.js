var getMasterLevelHpGain = require('./get-master-level-hp-gain');
var getNameLevel = require('./get-name-level');

function profileToRows(profile) {
  var hd = profile.startingHD;
  var nameLevel = getNameLevel(profile);
  var rows = profile.levelNames.map(levelNameToRow);

  function levelNameToRow(levelName, i) {
    return {
      name: levelName,
      levelNumber: i + 1,
      hd: getHitDiceForLevel(
        profile.startingHD, profile.hitDie, i + 1, nameLevel, 
        profile.gainsHDForever
      ),
      xpRange: [22500 * i, 22500 * (i + 1)]
    };
  }

  return rows;
}

function getHitDiceForLevel(startingHD, hitDieType, level, nameLevel, gainsHDForever) {
  if (gainsHDForever) {
    return (startingHD + level - 1).toString();
  }
  else {
    var hd = (startingHD + Math.min(level, nameLevel) - 1).toString();
    var levelsPastNameLevel = level - nameLevel;
    if (levelsPastNameLevel > 0) {
      hd += ('+' + getMasterLevelHpGain(hitDieType) * levelsPastNameLevel);
    }
    return hd;
  }
}

module.exports = profileToRows;
