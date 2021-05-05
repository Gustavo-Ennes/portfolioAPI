const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true ,
  useFindAndModify: false,
};

let getURL = (env) => {
  console.log(env)
  return (env === 'test') ? process.env.DB_HOST_TEST : process.env.DB_HOST
}

mongoose.connect(getURL(process.env.NODE_ENV), options)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose