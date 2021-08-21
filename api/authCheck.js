const crypto = require("crypto");
var CryptoJS = require("crypto-js");

async function routes(fastify, options) {
  fastify.get("/auth", async (req, res) => {
    currentTs = (Date.now() / 1000) | 0;
    var dsHeader = req.headers.ds;
    var DS_SALT =
      "K75XPRrLDXD6cbwVjVSMVWr7sRmRbAbhGRVd4M86ZzD3KwzxFUCr5gc9zvjYzZUWLnmuGSjVUxyVV7SJS8KBreGLajyGMecGwyWRPDaveJsV8WGnDea9M9A6PtqX4DnV";
    console.log(dsHeader, " : ", currentTs);
    // if (dsHeader > currentTs - 200 || dsHeader == currentTs) {
    //   return { check: true };
    // } else {
    //   return { check: false };
    // }
    function makeid(length) {
      var result = [];
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return result.join("");
    }

    var ds1 = (Date.now() / 1000) | 0,
      ds2 = makeid(10),
      ds3 = CryptoJS.HmacSHA512(
        `t=${ds1}&r=${ds2}`,
        `salt=${DS_SALT}`
      ).toString();
    var dsToken = ds1 + `,` + ds2 + `,` + ds3;
    console.log(dsToken);
    if (dsHeader > currentTs - 2000 || dsHeader == currentTs) {
      return { check: true };
    } else {
      return { check: false };
    }
  });
}

module.exports = routes;
