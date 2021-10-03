const fastify = require("fastify")({
  logger: {
    level: "info",
    file: "./requests.log", // will use pino.destination()
  },
});
const fs = require("fs");

fastify.register(require("fastify-formbody"));

fastify.get("/hello", function (req, res) {
  res.send({ message: "LockNKey Server" });
});

fastify.get("/", function (req, res) {
  const bufferIndexHtml = fs.readFileSync("index.html");
  res.type("text/html").send(bufferIndexHtml);
});

fastify.get("/encode", function (req, res) {
  const bufferIndexHtml = fs.readFileSync("./public/encode.html");
  res.type("text/html").send(bufferIndexHtml);
});

fastify.get("/decode", function (req, res) {
  const bufferIndexHtml = fs.readFileSync("./public/decode.html");
  res.type("text/html").send(bufferIndexHtml);
});

fastify.get("/decodeFile", function (req, res) {
  const bufferIndexHtml = fs.readFileSync("./public/keyStoreDecode.html");
  res.type("text/html").send(bufferIndexHtml);
});

fastify.get("/logs", function (req, res) {
  const bufferLogs = fs.readFileSync("requests.log");
  res.type("application/json; charset=utf-8").send(bufferLogs);
});

fastify.register(require("./api/decrypt"));
fastify.register(require("./api/encrypt"));
fastify.register(require("./api/authCheck"));
fastify.register(require("./api/decodeFile"));

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});
