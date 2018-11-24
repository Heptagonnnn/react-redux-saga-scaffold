const path = require("path");

function resolve(...pathArguments) {
  return path.join(__dirname, "..", ...pathArguments);
}


exports.resolve = resolve;