module.exports = function routes(content) {
  var fs = require("fs");
  var filename = Date.now();
  fs.writeFile(
    `./keychainStore/${filename}.keychain`,
    content,
    function (err, file) {
      if (err) throw err;
    }
  );
};
