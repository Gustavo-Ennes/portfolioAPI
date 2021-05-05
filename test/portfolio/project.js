const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const expect = chai.expect
const project = require('../../models/portfolio/project');

chai.use(chaiHttp);

describe("GET /", done =>{
  it("all projects", () => {    
    chai.request(server)
    .get('/portfolio/project')
    .then(res => {
      expect(res.body).to.deep.include('projects')
      done()
    })
  });  
})

describe('GET /', () => {
  before(() => {
    let payload = {
      name: "test",
      title: "123"
    }
    chai.request(server)
    .post('/portolio/project')
    .send(payload)
  })

  it('one single project',done => {
    chai.request(server)
    .get('/portfolio/project')
    .then(res => {
      expect(res).to.deep.include('projects')
      expect(res['projects']).to.deep.include({name: 'test'})
      done()
    })
  })

  after( () => {
    chai.request(server)
    .delete('/portfolio/project')
    .send({all: false, name: 'test'})
  })  
});