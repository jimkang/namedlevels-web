var getMasterLevelHpGain = require('./get-master-level-hp-gain');

function profileToRows(profile) {
  var hd = profile.startingHD;
  var rows = profile.levelNames.map(levelNameToRow);

  function levelNameToRow(levelName, i) {
    return {
      name: levelName,
      levelNumber: i + 1,
      hd: getHitDiceForLevel(profile.startingHD, profile.hitDie, i + 1)
    };
  }

  return rows;
}

function getHitDiceForLevel(startingHD, hitDieType, level) {
  var hd = (startingHD + Math.min(level, 9) - 1).toString();
  var levelsPast9 = level - 9;
  if (levelsPast9 > 0) {
    hd += ('+' + getMasterLevelHpGain(hitDieType) * levelsPast9);
  }
  return hd;
}

module.exports = profileToRows;
