const {compare} = require('../../utils/kratodo/passEncryptDecrypter')
const User = require('../../models/kratodo/User')
const auth = require('basic-auth')

const authmiddle = async (req, res, next) => {
	try{
		if(req.session.userID){
			const user = await User.findOne({email: email})
			if(user){
				next()
			} else{
				res.status(400).json({error: "This user ID doesn't exists"})
			}
		}
		else{
			const payload = auth(req)
			const email = payload.name
			const pass = payload.pass
			const user = await User.findOne({email: email})
			if(user){

				if(compare(pass, user.password)){
					req.session.userID = user._id
					req.session.username = user.name
				}
			} else{
				res.status(401).json({error: "This user doesn't exists"})
			}
		}
	}catch(err){
		next(err)
	}
	next()
}

module.exports = authmiddle