const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const expect = chai.expect
const User = require('../../models/kratodo/User')

chai.use(chaiHttp);

const testUserPayload = {
  name: "test user",
  email: "test@ennes.dev",
  password: "123123"
}


// tests about users
describe("User", () =>{

  describe("Creation", () => {

    // deleting all posiible test users created
    before( async () => {
      await User.deleteOne({email: "test@ennes.dev"})  })

    it('create user', done => {
      chai.request(server)
        .post('/kratodo/create-user')
        .send(testUserPayload)
        .end((err, res) => {
          if (err) done(err);
          expect(res.status).to.equal(201)
          done()
        });
    });
    // deleting again after the test
    after( async() => {
      await User.deleteOne({email: "test@ennes.dev"})
    })
  })

  // describe("Deletion", () => {
  //   before( async() => {
  //     await User.create(testUserPayload)
  //   })

  //   it("delete user", done => {
  //     const user = await User.findOne({email: testUserPayload.email})

  //     chai.request(server)
  //       .delete(`/kratodo/delete-user/${user._id}`)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200)
  //         done()
  //       })
  //   })

  //   after( async() => {
  //     await User.deleteOne({email: testUserPayload.email})
  //   })
  // })
})


// tests about todo's
describe("Todo", () => {

  describe("create todo", () => {
    // create test user, login, and create a todo
    before(async () => {
      await User.create(testUserPayload)
    })

    it("created user logins and creates a todo titled 'test todo'", done => {

      // login
      chai.request(server)
        .post('/kratodo/login')
        .send({
          email: testUserPayload.email,
          password: testUserPayload.password
        })
        .end((err, res) => {
          if(err)done(err);
          expect(res.status).to.equal(200)

          chai.request(server)
            .post('/kratodo/todos')
            .send({title: "test Todo"})
            .end((err, res) => {
              if(err)done(err)
              expect(res.status).to.equal(201)

              chai.request(server)
                .get('kratodo/todos')
                .end((err, res) => {
                  if(err)done(err)

                  expect(res.data).to.have.property('todos')
                  done()
                })
            })
        })
     })
     after(async() => {
      await User.deleteOne({email: testUserPayload.email})
     })
  })
})
