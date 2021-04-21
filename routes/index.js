let router = require('express').Router()

router
.get("/", async (req, res) => {
    res.send({message: "Welcome to my API!"})
})

module.exports = router