const {compare} = require('../../utils/kratodo/passEncryptDecrypter')
const User = require('../../models/kratodo/User')
const auth = require('basic-auth')

const authmiddle = async (req, res, next) => {
	try{
		const payload = auth(req)
		if(!payload){
			req.session.reload(async () => {
		
				const userID = req.session.userID
				const sessionUser = await User.findOne({_id: userID})
		
				if(sessionUser){
					next()
				} else{
					res.status(400).json({error: "This user ID doesn't exists"})
				}
			})
		} else{
			const email = payload.name
			const pass = payload.pass

			console.log(`email: ${email}, pass: ${pass}`)

			const authUser = await User.findOne({email: email})

			if(authUser){

				if(compare(pass, authUser.password)){

					req.session.userID = authUser._id
					req.session.username = authUser.name
					req.session.email = authUser.email
					next()
					
				}	else{
					res.status(401).json({error: "Password don't match"})
				}			
			} else{
				res.status(401).json({error: "This user doesn't exists"})
			}
		}
	}catch(err){
		next(err)
	}
}

module.exports = authmiddle