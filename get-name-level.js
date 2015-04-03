function getNameLevel(classProfile) {
  var lowerCaseClassNames = classProfile.levelNames.map(lowerCaseIt);
  return lowerCaseClassNames.indexOf(classProfile.className.toLowerCase()) + 1;
}

function lowerCaseIt(s) {
  return s.toLowerCase();
}

module.exports = getNameLevel;
