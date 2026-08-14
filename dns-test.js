/* eslint-disable @typescript-eslint/no-require-imports */
const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.rlie7xo.mongodb.net",
  (err, records) => {
    console.log("ERROR:", err);
    console.log("RECORDS:", records);
  }
);