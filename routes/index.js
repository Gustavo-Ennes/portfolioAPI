let router = require('express').Router()
const sendMail = require('../utils/mail')

router
.get("/", async (req, res) => {
    res.send({message: "Welcome to my API!"})
})
// parameter received in req.body.to must be a array of strings
.post("/send-mail/", async (req, res) => {   
    const to = req.body.to
    const from = req.body.from || null
    try{
        let result = await sendMail(to, from)
        console.log(result)
        res.send(result)
    }catch(err){
        console.log(err)
    }
})

module.exports = router