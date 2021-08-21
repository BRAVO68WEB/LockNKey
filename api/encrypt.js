var randomWords = require("random-words");
const crypto = require("crypto");

function genFile(content) {
  var fs = require("fs");
  var filename = Date.now();
  fs.writeFile(
    `./keychainStore/${filename}.keychain`,
    content,
    function (err, file) {
      if (err) throw err;
    }
  );
}

function createDigest(encodedData, secret, format) {
  return crypto.createHmac("sha512", secret).update(encodedData).digest(format);
}

function encode(sourceData, secret) {
  const json = JSON.stringify(sourceData);
  const encodedData = Buffer.from(json).toString("base64");
  return `${encodedData}!${createDigest(encodedData, secret, "base64")}`;
}

async function routes(fastify, options) {
  fastify.post("/encode", async (req, res) => {
    const data = req.body;
    const secret = randomWords({ exactly: 5, join: " " });
    const encoded = encode(data, secret);
    genFile(encoded);
    return {
      secret: secret,
      encoded: encoded,
    };
  });
}

module.exports = routes;
