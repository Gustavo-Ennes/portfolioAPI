const whitelist = ['https://ennes.dev', 'https://www.ennes.dev', 'http://localhost:8080', 'https://localhost:8080'];

const middle = (req, res, next) => {
  var origin = req.headers.origin;
  if (whitelist.indexOf(origin) != -1) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", ["Access-Control-Allow-Headers", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers",  "Content-Type","X-Requested-With","X-HTTP-Method-Override","Accept"]);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
  res.header("Cache-Control", "no-store,no-cache,must-revalidate");
  res.header("Vary", "Origin");
  if (req.method === "OPTIONS") {
  res.status(200).send("");
    return;
  }
  next();
}

module.exports = middle