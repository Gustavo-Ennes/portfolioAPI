const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect
const mongo = require('mongodb');
const project = require('../models/project');


chai.use(chaiHttp);

describe("GET /", () =>{
  it("all projects", done => {    
    chai.request(server)
    .get('/project')
    .then(res => {
      expect(res.body).to.have.property('projects')
      done()
    })
  });  
})

describe('GET /', () => {
  before(done => {
    let payload = {
      name: "feriapp",
      title: "Feriapp"
    }
    chai.request(server)
    .post('/project')
    .send(payload)
    .end(done())
  })

  it('one single project', done => {
    chai.request(server)
    .get('/project/')
    .then(res => {
      expect(res).to.have.property('projects')
      expect(res).to.have.property('projects').to.have.lengthOf(1)
    })
    .end(done())
  })

  after( done => {
    chai.request(server)
    .delete('/project')
    .send({all: true})
    project.deleteMany(null, done)
  })  
});