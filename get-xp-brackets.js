var createProbable = require('probable').createProbable;
var getNameLevel = require('./get-name-level');

function getXPBrackets(profile, random) {
  var probable = createProbable({
    random: random
  });

  var nameLevel = getNameLevel(profile);
  var level1Limit = getLevel1Limit(profile, probable);
  var limits = [level1Limit];
  var lastLimit;

  while (limits.length < nameLevel && getLastLimitStepSize(limits) < 250000) {
    var span = 1 + probable.rollDie(2);
    if (limits.length + span > nameLevel) {
      // Geometric growth should stop at name level.
      span = nameLevel - limits.length;
    }
    lastLimit = limits[limits.length - 1];
    limits = limits.concat(getLimitsForSpanOfLevels(lastLimit, span, probable));
  }

  lastLimit = limits[limits.length - 1];
  var lastGain = 0;
  if (limits.length > 1) {
    lastGain = lastLimit - limits[limits.length - 2];
  }
  var levelsLeft = profile.levelNames.length - limits.length;

  limits = limits.concat(
    getLimitsForMasterLevels(lastLimit, lastGain, levelsLeft)
  );

  return limits.map(rangeFromLimit);
}

function getLastLimitStepSize(limits) {
  var size = 0;
  var len = limits.length;
  if (len > 1) {
    size = limits[len - 1] - limits[len - 2];
  }
  return size;
}

function getLevel1Limit(profile, probable) {
  var level1BracketBase = 4;

  if (profile.startingHD == 2) {
    level1BracketBase + 1;
  }
  else if (profile.startingHD == 3) {
    level1BracketBase += 3;
  }

  if (profile.gainsHDForever) {
    level1BracketBase += 1;
  }

  return 250 * (level1BracketBase + probable.rollDie(6));
}

function getLimitsForSpanOfLevels(base, howMany, probable) {
  var increaseFactor = 1.0 + 0.1 * probable.rollDie(9);
  if (base < 125000) {
    increaseFactor += 0.1 * probable.rollDie(9);
  }

  var limits = [];
  var lastLimit = base;

  var step = 250;
  if (base > 10000) {
    step = 1000;
  }
  if (base > 100000) {
    step = 5000;
  }

  for (var i = 0; i < howMany; ++i) {
    lastLimit *= increaseFactor;
    limits.push(lockToStep(lastLimit, step));
  }

  return limits;
}

function getLimitsForMasterLevels(base, xpIncrease, howMany) {
  var limits = [];
  var lastLimit = base;

  for (var i = 0; i < howMany; ++i) {
    lastLimit += xpIncrease;
    limits.push(lastLimit);
  }

  return limits;  
}

function lockToStep(n, step) {
  return n - (n % step);
}

function rangeFromLimit(limit, index, limits) {
  var lastLimit = 0;
  if (index > 0) {
    lastLimit = limits[index - 1];
  }
  return [lastLimit + 1, limit];
}

module.exports = getXPBrackets;
