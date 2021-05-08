const {compare} = require('../../utils/kratodo/passEncryptDecrypter')
const User = require('../../models/kratodo/User')
const auth = require('basic-auth')

const authmiddle = async (req, res, next) => {
	try{
		const payload = auth(req)
		const email = payload.name
		const pass = payload.pass
		const user = await User.findOne({email: email})
		if(user){
			if(user.isLogged){
				req.body.userID = user._id
			} else{
				if(compare(pass, user.password)){
					req.body.userID = user._id
					req.body.user = user 
				}
			}
		}
	}catch(err){
		next(err)
	}
	next()
}

module.exports = authmiddle