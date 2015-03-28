var d3 = require('./lib/d3-small');

var root;
var columnRoots = {};

function render(classProfile) {
  d3.select('#title').text(classProfile.className + ' TABLE');

  if (!root) {
    root = d3.select('#root');
  }

  renderColumnData({
    rootName: 'levelNameRoot',
    columnId: 'level-name-root',
    columnClass: 'name-column',
    headerText: 'Level Title',
    dataClass: 'level-name',
    data: classProfile.levelNames,
    centerText: false
  });

  renderColumnData({
    rootName: 'hitDiceRoot',
    columnId: 'hit-dice-root',
    columnClass: 'hit-dice-column',
    headerText: classProfile.hitDie + '-Sided Dice for Accumulated Hit Points',
    dataClass: 'hit-dice',
    data: d3.range(1, classProfile.levelNames.length + 1)
  });

  renderColumnData({
    rootName: 'levelNumberRoot',
    columnId: 'level-number-root',
    columnClass: 'level-number-column',
    headerText: 'Experience Level',
    dataClass: 'level-number',
    data: d3.range(1, classProfile.levelNames.length + 1)
  });

}

function renderColumnData(opts) {
  var rootName;
  var columnId;
  var columnClass;
  var headerText;
  var dataClass;
  var data;
  var centerText = true;

  if (opts) {
    rootName = opts.rootName;
    columnId = opts.columnId;
    columnClass = opts.columnClass;
    headerText = opts.headerText;
    dataClass = opts.dataClass;
    data = opts.data;
    if ('centerText' in opts) {
      centerText = opts.centerText;
    }
  }

  var columnRoot = columnRoots[rootName];

  if (!columnRoot) {
    columnRoot = root.append('div').attr('id', columnId)
      .classed(columnClass, true);

    if (centerText) {
      columnRoot.classed('centered-text', true);
    }

    appendColumnHeader(columnRoot, headerText);
    columnRoots[rootName] = columnRoot;
  }

  columnRoot.select('.inner-header').text(headerText);

  var dataElements = columnRoot.selectAll('.' + dataClass).data(data);
  dataElements.enter().append('div').classed(dataClass, true);

  fadeAndRemove(dataElements.exit());

  dataElements.text(identity);
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
