const crypto = require("crypto");

function createDigest(encodedData, secret, format) {
  return crypto.createHmac("sha512", secret).update(encodedData).digest(format);
}

function decode(value, secret) {
  let [encodedData, sourceDigest] = value.split("!");
  if (!encodedData || !sourceDigest) throw new Error("invalid value(s)");
  const json = Buffer.from(encodedData, "base64").toString("utf8");
  const decodedData = JSON.parse(json);
  const checkDigest = createDigest(encodedData, secret);
  const digestsEqual = crypto.timingSafeEqual(
    Buffer.from(sourceDigest, "base64"),
    checkDigest
  );
  if (!digestsEqual) throw new Error("invalid value(s)");
  return decodedData;
}

async function routes(fastify, options) {
  fastify.post("/decode", async (req, res) => {
    const data = req.body.toBeDecoded;
    const secret = req.body.privateKey;
    const decoded = decode(data, secret);
    return { decoded };
  });
}

module.exports = routes;
