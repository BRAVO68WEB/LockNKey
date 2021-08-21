async function routes(fastify, options) {
  fastify.post("/decodeUpload", async (req, res) => {
    const data = req.body.filetoBeDecoded;
    console.log(req);
    FileReader().readAsArrayBuffer(data);
    return { data };
  });
}

module.exports = routes;
