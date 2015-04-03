var badCharsRegex = /[^\w\d-\s]/g;

function sanitizeClassSegment(raw) {
  if (!raw) {
    return raw;
  }
  else {
    return raw.replace(badCharsRegex, '').trim();
  }
}

module.exports = sanitizeClassSegment;
