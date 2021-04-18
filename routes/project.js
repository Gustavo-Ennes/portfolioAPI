const Project = require('../models/project');
let router = require('express').Router()

router
.get('/project', async (req,res) => {
    try{
        let projects = await Project.find()
        console.log(projects)
        res.send({projects})
    }catch(err){
        console.log(err)
    }
})
.get('/project/:id', async (req,res) => {
    try{
        if( Object.keys(req.params).includes('id')){
            let project = await Project.findOne({_id: req.params.id})
            if(project){
                res.send({project})
            }else{
                res.send("Project id doesn't exists")
            }
        }else{
            res.send("No id provided")
        }
    }catch(err){
        console.log(err)
    }
})
.post('/project', async(req, res) => {
    try{
        let p = await Project.create(req.body)
        res.send(p)
    }catch(err){
        console.log(err)
    }
})
.put('/project', async( req, res) =>{
    let p = await Project.updateOne({_id: req.params._id}, req.body)
    res.send(p)
})
.delete('/project', async (req, res) => {
    await Project.deleteOne({_id: req.body._id})
    res.status(200).send()
})


module.exports = router
