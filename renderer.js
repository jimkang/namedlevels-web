var profileToRows = require('./profile-to-rows');
var accessor = require('accessor');
var renderHeaderRow = require('./render-header-row');
var getMasterLevelHpGain = require('./get-master-level-hp-gain');
var getNameLevel = require('./get-name-level');
var numeral = require('numeral');

var root;

function render(classProfile) {
  d3.select('#title').text(classProfile.pluralOfName + ' TABLE I.');

  if (!root) {
    root = d3.select('#root');
  }

  d3.select('#class-page').classed({
    hidden: false,
    revealed: true
  });

  var rows = profileToRows(classProfile);

  renderHeaderRow(root, classProfile);

  var rowElements = root.selectAll('.row:not(#header-row)')
    .data(rows, accessor('levelNumber'));

  rowElements.enter().append('tr').classed('row', true).each(addRowCells)
  rowElements.each(updateRowCells);
  fadeAndRemove(rowElements.exit());

  renderFooter(classProfile);
}

function addRowCells() {
  var row = d3.select(this);

  row.append('td').classed('level-number-column', true);
  row.append('td').classed('hit-dice-column', true);
  row.append('td').classed('name-column', true);
  row.append('td').classed('xp-low-end-column', true);
  row.append('td').classed('xp-range-divider-column', true);
  row.append('td').classed('xp-high-end-column', true);
}

function updateRowCells(d) {
  var row = d3.select(this);

  row.select('.level-number-column').text(d.levelNumber);
  row.select('.hit-dice-column').text(d.hd);
  row.select('.name-column').text(d.name);
  row.select('.xp-low-end-column').text(numeral(d.xpRange[0]).format('0,0'));
  row.select('.xp-range-divider-column').html('&mdash;');
  row.select('.xp-high-end-column').text(numeral(d.xpRange[1]).format('0,0'));
}

function fadeAndRemove(selection) {
  selection
    .classed('fade-out', true)
    .transition().delay(500)
    .remove();
}

function renderFooter(classProfile) {
  var hdMessage = '';
  if (!classProfile.gainsHDForever) {
    hdMessage = classProfile.pluralOfName + ' gain ' +
      getMasterLevelHpGain(classProfile.hitDie) +
    ' h.p. per level after the ' + getNameLevel(classProfile) + 'th.';
  }

  d3.select('#footnotes').text(hdMessage);
}

module.exports = {
  render: render
};
