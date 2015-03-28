var d3 = require('./lib/d3-small');

var root;
var levelNameRoot;
var hitDiceRoot;
var levelNumberRoot;

function render(classProfile) {
  if (!root) {
    root = d3.select('#root');
  }

  renderLevelNames(classProfile);
  renderHitDice(classProfile);
}

function renderLevelNames(classProfile) {
  if (!levelNameRoot) {
    levelNameRoot = root.append('div')
      .attr('id', 'level-name-root')
      .classed('name-column', true);

    appendColumnHeader(levelNameRoot, 'Level Title');
  }

  var levelNames = levelNameRoot.selectAll('.level-name')
    .data(classProfile.levelNames);
  levelNames.enter().append('div').classed('level-name', true);

  fadeAndRemove(levelNames.exit());

  levelNames.text(identity);
}

function renderHitDice(classProfile) {
  if (!hitDiceRoot) {
    hitDiceRoot = root.append('div')
      .attr('id', 'hit-dice-root')
      .classed('hit-dice-column', true)
      .classed('centered-text', true);

    appendColumnHeader(
      hitDiceRoot, 
      classProfile.hitDie + '-Sided Dice for Accumulated Hit Points'
    );
  }

  var levelNumberData = d3.range(1, classProfile.levelNames.length + 1);
  var levelNumbers = hitDiceRoot.selectAll('.hit-dice')
    .data(levelNumberData);
  levelNumbers.enter().append('div').classed('hit-dice', true);

  fadeAndRemove(levelNumbers.exit());

  levelNumbers.text(identity);
}

function renderLevelNumbers(classProfile) {
  if (!levelNumberRoot) {
    levelNumberRoot = root.append('div')
      .attr('id', 'level-number-root')
      .classed('level-number-column', true)
      .classed('centered-text', true);

  }
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

function fadeAndRemove(selection) {
  selection
    .classed('fade-out', true)
    .transition().delay(500)
    .remove();

}

module.exports = {
  render: render
};
