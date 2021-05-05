const axios = require('axios').default 

module.exports = () => {
  axios.get('https://feriapp.herokuapp.com') //user:test12345
  axios.get('https://kratodo.herokuapp.com')
}