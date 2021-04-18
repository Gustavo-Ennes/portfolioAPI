let mongoose = require('mongoose');
let Project = require('../models/project');

/*
 * GET /book route to retrieve all the books.
 */
function getProjects(req, res) {
    //Query the DB and if no errors, send all the books
    let query = Project.find({});
    query.exec((err, projects) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(projects);
    });
}

/*
 * POST /book to save a new book.
 */
function postProject(req, res) {
    //Creates a new book
    var newProject = new Project(req.body);
    //Save it into the DB.
    newProject.save((err,project) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Project successfully added!", project });
        }
    });
}

/*
 * GET /book/:id route to retrieve a book given its id.
 */
function getProject(req, res) {
    Project.findById(req.params.id, (err, project) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(project);
    });
}

/*
 * DELETE /book/:id to delete a book given its id.
 */
function deleteProject(req, res) {
    Project.deleteOne({_id : req.params.id}, (err, result) => {
        res.json({ message: "Project successfully deleted!", result });
    });
}

/*
 * PUT /book/:id to updatea a book given its id
 */
function updateProject(req, res) {
    Project.findById({_id: req.params.id}, (err, project) => {
        if(err) res.send(err);
        Object.assign(project, req.body).save((err, project) => {
            if(err) res.send(err);
            res.json({ message: 'Project updated!', project });
        });
    });
}

//export all the functions
module.exports = { getProjects, postProject, getProject, deleteProject, updateProject };
