const {compare} = require('../../utils/kratodo/passEncryptDecrypter')
const User = require('../../models/kratodo/User')
const auth = require('basic-auth')

const authmiddle = async (req, res, next) => {
	try{
		await req.session.reload()
	
		const userID = req.session.userID
		const payload = auth(req)

		if(payload){
			const email = payload.name
			const pass = payload.pass
			const authUser = await User.findOne({email: email})

			await req.session.regenerate()

			if(authUser){

				if(compare(pass, authUser.password)){
					req.session.userID = authUser._id
					req.session.username = authUser.name
					req.session.email = authUser.email
				}
			} else{
				res.status(401).json({error: "This user doesn't exists"})
			}

		} else{
			const sessionUser = await User.findOne({_id: userID})

			if(sessionUser){
				next()
			} else{
				res.status(400).json({error: "This user ID doesn't exists"})
			}
		}
	}catch(err){
		next(err)
	}
	next()
}

module.exports = authmiddle