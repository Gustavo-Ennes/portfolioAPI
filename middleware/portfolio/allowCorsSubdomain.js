const middle = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", ["Content-Type","X-Requested-With","X-HTTP-Method-Override","Accept"]);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Cache-Control", "no-store,no-cache,must-revalidate");
  res.header("Vary", "Origin");
  if (req.method === "OPTIONS") {
  res.status(200).send("");
    return;
  }
  next();
}

module.exports = middle