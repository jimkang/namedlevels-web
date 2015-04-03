var d3 = require('./lib/d3-small');

var headerRow;

function renderHeaderRow(root, classProfile) {
  if (!headerRow) {
    headerRow = root.append('tr').attr('id', 'header-row').classed('row', true);
  }

  var headerSpecs = [
    {
      columnClass: 'name-column',
      text: 'Level Title',
      shortText: 'Title'
    },
    {
      columnClass: 'hit-dice-column',
      text: classProfile.hitDie + '-Sided Dice for Accumulated Hit Points',
      shortText: 'Hit Dice (d' + classProfile.hitDie + ')'
    },
    {
      columnClass: 'level-number-column',
      text: 'Experience Level',
      shortText: 'Level'
    },
    {
      columnClass: 'xp-column-title',
      text: 'Experience Points',
      shortText: 'XP'
    }
  ];

  headerSpecs.map(addRowOpt).forEach(renderColumnHeader);

  function addRowOpt(opts) {
    opts.row = headerRow;
    return opts;
  }  
}

function renderColumnHeader(opts) {
  var header = opts.row.select('.' + opts.columnClass);
  if (header.empty()) {
    header = opts.row
      .append('td').classed('column-header', true)
      .classed(opts.columnClass, true)
      // .append('div').classed('inner-header', true);
    header
      .append('span')
      .classed('full-header-text', true)
    header
      .append('span')
      .classed('short-header-text', true)
  }

  header.select('.full-header-text').text(opts.text);
  header.select('.short-header-text').text(opts.shortText);

  return header;
}

module.exports = renderHeaderRow;
