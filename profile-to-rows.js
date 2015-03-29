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

function getMasterLevelHpGain(hitDie) {
  var gain;

  if (hitDie > 12) {
    gain = 4;
  }
  else if (hitDie > 8) {
    gain = 3;
  }
  else if (hitDie > 4) {
    gain = 2;
  }
  else {
    gain = 1;
  }

  return gain;  
}

module.exports = profileToRows;
