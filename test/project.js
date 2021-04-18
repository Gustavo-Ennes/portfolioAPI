const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect

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
    .then(done())
  })

  it('one single project', done => {
    chai.request(server)
    .get('/project/?id=1')
    .then(res => {
      expect(res).to.have.property('project')
      done()
    })
  })

  after( () => {

  })  
});