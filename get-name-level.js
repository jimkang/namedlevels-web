function getNameLevel(classProfile) {
  return classProfile.levelNames.indexOf(classProfile.className) + 1;
}

module.exports = getNameLevel;
