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

module.exports = getMasterLevelHpGain;
