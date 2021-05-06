const express = require('express');
const router = express.Router();
const {encrypt, compare} = require('../../utils/kratodo/passEncryptDecrypter')
const checkUserMiddleware = require('../../utils/kratodo/checkUser');
const User = require('../../models/kratodo/User');


router.get('/', async(req,res) => {
	res.status(200).json({index: "Welcome to kratodo api"})	
});

//Router 1: for redering the hompage
router.get('/login/', (req, res) => {
	let sess = req.session
	if (sess.email && sess.visits) {
		res.json({message: "User is already authenticated"});
		} else {
			res.json({message: "Authenticate via post"});
	}
});
	 
	//Router 2: for login operation
router.post('/login/', async (req, res) => {
	try{
		let sess = req.session
		let passwordsMatch = false

		user = await User.findOne({email: req.body.email})

		if(user){
			userExists = true
			passwordsMatch = compare(req.body.password, user.password)

			// destroying session if a logged user try to login with other credentials
			if(Object.keys(sess).includes('email') && user.email !== sess.email){
				anotherUser = await User.findOne({email: sess.email})
				anotherUser.isLogged = false
				anotherUser.save()
				req.session.regenerate()
			}

			if(passwordsMatch){
				sess.email = req.body.email;
				user.isLogged = true
				user.qtdVisits++
				user.save()
				res.send({message: `${user.name} logged successfully`})
			} else{
				res.json({message: "The password doesn't match"})
			}
		} else{
			res.json({message: "This user doesn't exists"})
		}
	}catch(err){
		console.log(err)
		res.send({message: `${err }`})
	}
});
	 
//Router 4: for session destruction
router.get('/logout/', async (req, res) => {
	let user = await User.findOne({email: req.session.email})
	if(user){
		user.isLogged = false
		user.save()
	}
	req.session.destroy(err => {
		if (err) {
			return console.log(err);
		}
	});
	res.json({message: "Bye"})
});

//Router 5: create Users
router.post('/create-user/', checkUserMiddleware, async (req, res) => {
	if(req.session.newUserValidated){
		try{
			let name = req.body.name
			let email = req.body.email
			let password = encrypt(req.body.password)

			await User.create({
				name: name,
				email: email,
				password: password
			})
			res.json({message: `The user ${ name  } was created.`})				

		}catch(err){
			console.log(err)
			res.json({message: `${ err }`})
		}
	} else{
		res.json({message: `${ req.session.newUserMessage }`})
	}
})


module.exports = router;
