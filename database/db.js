const mongoose = require('mongoose')
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true ,
  useFindAndModify: false,
};

let getURL = (env) => {
  console.log(env)
  return (env === 'test') ? process.env.DB_HOST : process.env.DB_HOST_TEST
}

mongoose.connect(getURL(process.env.NODE_ENV), options)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose