function render(classProfile) {
  var root = d3.select('#root');

  var levelNameRoot = root.append('div')
    .attr('id', 'level-name-root')
    .classed('name-column', true);

  appendColumnHeader(levelNameRoot, 'Level Title');

  var levelNames = levelNameRoot.selectAll('.level-name')
    .data(classProfile.levelNames);
  levelNames.enter().append('div').classed('level-name', true);
  levelNames.text(identity);

  var levelNumberRoot = root.append('div')
    .attr('id', 'level-number-root')
    .classed('level-number-column', true)
    .classed('centered-text', true);

  appendColumnHeader(
    levelNumberRoot, 
    classProfile.hitDie + '-Sided Dice for Accumulated Hit Points'
  );

  var levelNumberData = d3.range(1, classProfile.levelNames.length + 1);
  var levelNumbers = levelNumberRoot.selectAll('.level-number')
    .data(levelNumberData);
  levelNumbers.enter().append('div').classed('level-number', true);
  levelNumbers.text(identity);
}

function appendColumnHeader(columnRoot, text, innerClass) {
  columnRoot
    .append('div').classed('column-header', true)
    .append('div').classed('inner-header', true)
    .text(text);  
}

function identity(d) {
  return d;
}

module.exports = {
  render: render
};
