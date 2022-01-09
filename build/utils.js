const path = require('path');
exports.resolve = function resolve (p) {
  return path.resolve(__dirname, `../${p}`)
}