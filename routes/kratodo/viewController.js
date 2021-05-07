const express = require('express');
const router = express.Router();
const {encrypt, compare} = require('../../utils/kratodo/passEncryptDecrypter')
const checkUserMiddleware = require('../../utils/kratodo/checkUser');
const User = require('../../models/kratodo/User')
const authMiddleware = require('../../middleware/kratodo/auth')


router.get('/', async(req,res) => {
	res.status(200).json({index: "Welcome to kratodo api"})	
});

router.get('/users/',authMiddleware, async(req, res) => {
	if(req.body.userID){
		const users = await User.find({}).select(['name', '-_id'])
		res.status(200).json({users})
	}else{
		res.status(401).json({error: "Need credentials"})
	}
})

//Router 5: create Users
router.post('/create-user/', authMiddleware, checkUserMiddleware, async (req, res) => {
	if(req.body.newUserValidated){
		try{
			let name = req.body.name
			let email = req.body.email
			let password = encrypt(req.body.password)

			await User.create({
				name: name,
				email: email,
				password: password
			})
			res.status(201).json({message: `The user ${ name  } was created.`})				

		}catch(err){
			console.log(err)
			res.status(500).json({message: `${ err }`})
		}
	} else{
		res.status(406).json({message: `${ req.body.newUserMessage }`})
	}
})


module.exports = router;
