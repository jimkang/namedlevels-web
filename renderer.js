var d3 = require('./lib/d3-small');

var root;
var columnRoots = {};

function render(classProfile) {
  d3.select('#title').text(classProfile.className + ' TABLE');

  if (!root) {
    root = d3.select('#root');
  }

  renderLevelNames(classProfile);

  renderColumnData({
    rootName: 'hitDiceRoot',
    columnId: 'hit-dice-root',
    columnClass: 'hit-dice-column',
    headerText: classProfile.hitDie + '-Sided Dice for Accumulated Hit Points',
    dataClass: 'hit-dice',
    data: d3.range(1, classProfile.levelNames.length + 1)
  });
}

function renderLevelNames(classProfile) {
  if (!columnRoots.levelNameRoot) {
    columnRoots.levelNameRoot = root.append('div')
      .attr('id', 'level-name-root')
      .classed('name-column', true);

    appendColumnHeader(columnRoots.levelNameRoot, 'Level Title');
  }

  var levelNames = columnRoots.levelNameRoot.selectAll('.level-name')
    .data(classProfile.levelNames);
  levelNames.enter().append('div').classed('level-name', true);

  fadeAndRemove(levelNames.exit());

  levelNames.text(identity);
}

function renderColumnData(opts) {
  var rootName;
  var columnId;
  var columnClass;
  var headerText;
  var dataClass;
  var data;

  if (opts) {
    columnId = opts.columnId;
    columnClass = opts.columnClass;
    headerText = opts.headerText;
    dataClass = opts.dataClass;
    data = opts.data;
  }

  var columnRoot = columnRoots[rootName];

  if (!columnRoot) {
    columnRoot = root.append('div').attr('id', columnId)
      .classed(columnClass, true).classed('centered-text', true);

    appendColumnHeader(columnRoot, headerText);
    columnRoots[rootName] = columnRoot;
  }

  columnRoot.select('.inner-header').text(headerText);

  var dataElements = columnRoot.selectAll('.' + dataClass).data(data);
  dataElements.enter().append('div').classed(dataClass, true);

  fadeAndRemove(dataElements.exit());

  dataElements.text(identity);
}

function renderLevelNumbers(classProfile) {
  if (!levelNumberRoot) {
    levelNumberRoot = root.append('div')
      .attr('id', 'level-number-root')
      .classed('level-number-column', true)
      .classed('centered-text', true);

  }
}

function appendColumnHeader(columnRoot) {
  columnRoot
    .append('div').classed('column-header', true)
    .append('div').classed('inner-header', true);
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
