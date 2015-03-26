function render(classProfile) {
  var root = d3.select('#root');
  root.append('div').text(classProfile.className);
  root.append('div').text(classProfile.hitDie + '-sided Dice for Accumulated Hit Points');

  var levelNameRoot = root.append('div').attr('id', 'level-name-root');
  var levelNames = levelNameRoot.selectAll('.level-name')
    .data(classProfile.levelNames);
  levelNames.enter().append('div').classed('level-name', true);
  levelNames.text(identity);

  var levelNumberData = d3.range(1, classProfile.levelNames.length + 1);
  var levelNumberRoot = root.append('div').attr('id', 'level-number-root');
  var levelNumbers = levelNumberRoot.selectAll('.level-number')
    .data(levelNumberData);
  levelNumbers.enter().append('div').classed('level-number', true);
  levelNumbers.text(identity);
}

function identity(d) {
  return d;
}

module.exports = {
  render: render
};
