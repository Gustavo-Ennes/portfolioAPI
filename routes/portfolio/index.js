let router = require('express').Router()
const sendMail = require('../../utils/portfolio/mail')
const getTemplate = require('../../utils/portfolio/getTemplate');

router
.get("/", async (req, res) => {
    res.send({message: "Welcome to my API!"})
})
// parameter received in req.body.to must be a array of strings
.post("/send-mail/", async (req, res) => {   

    const to = req.body.to
    const from = req.body.from || null
    const html = getTemplate(req.body.html)
    const text = req.body.text
    const subject = req.body.subject
    
    try{
        let result = await sendMail(to, from, subject, html, text)
        res.send(result)
    }catch(err){
        console.log(err)
    }
})

module.exports = router