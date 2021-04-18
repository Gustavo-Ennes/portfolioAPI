process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Project = require('../controllers/models/project');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Projects', (done) => {
  beforeEach((done) => {
      Project.deleteMany({}, (err) => {
         done();
      });
  });
  describe('/GET project', () => {
      it('it should GET all the projects', (done) => {
        chai.request(server)
            .get('/project')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST project', () => {
    it('it should not POST a project without pages field', (done) => {
        let project = {
          name: "feriapp",
          title: "Feriapp",
          imagesUrls: [
              {label: "Any", imgUrl: "https://google.com"}
          ],
          video: {
              label: "My video",
              videoUrl: "https://youtube.com/"
          }
      } 
      chai.request(server)
          .post('/project')
          .send(project)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });
    it('it should POST a project ', (done) => {
      let project = {
        name: "feriapp",
        title: "Feriapp",
        imagesUrls: [
            {label: "Any", imgUrl: "https://google.com"}
        ],
        video: {
            label: "My video",
            videoUrl: "https://youtube.com/"
        }
      }
    chai.request(server)
        .post('/project')
        .send(project)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Project successfully added!');
          done();
        });
      });
  });
  describe("/PUT project", () => {

    it('it should UPDATE a project given the id', (done) => {
      let project = new Project({
        name: "feriapp",
        title: "Feriapp",
        imagesUrls: [
            {label: "Any", imgUrl: "https://google.com"}
        ],
        video: {
            label: "My video",
            videoUrl: "https://youtube.com/"
        }
      })
      project.save((err, project) => {
            chai.request(server)
            .put('/project/' + project._id)
            .send({
              name: "feriapp2",
              title: "Feriapp",
              imagesUrls: [
                  {label: "Any", imgUrl: "https://google.com"}
              ],
              video: {
                  label: "My video",
                  videoUrl: "https://youtube.com/"
              }
            })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Project updated!');
                  res.body.project.should.have.property('name').eql('feriapp2');
                  done();
            });
      });
    });
  });describe("/DELETE project", () => {

    it('it should DELETE a project given the id', (done) => {
      let project = new Project({
        name: "feriapp",
        title: "Feriapp",
        imagesUrls: [
            {label: "Any", imgUrl: "https://google.com"}
        ],
        video: {
            label: "My video",
            videoUrl: "https://youtube.com/"
        }
      })
      project.save((err, project) => {
            chai.request(server)
            .del('/project/' + project._id)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('message').eql('Project successfully deleted!');
                  done();
            });
      });
    });
  });
  return
});