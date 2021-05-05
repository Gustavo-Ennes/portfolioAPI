const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = (text) => {
  return bcrypt.hashSync(text, saltRounds)
}

const compare = (text, hash) => {  
  return bcrypt.compareSync(text, hash);
}

exports.encrypt = encrypt
exports.compare = compare

