/*

I have to implement username and passwords regex validations, and also for the email

*/

const nameRequisites = (name) => {return name.length > 5}
const passRequisites = (pass) => {return pass.length > 5}
const emailRequisites = (email) => {return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.exec(email) ? true : false}


module.exports = async(req, res, next) => {
  let message = null
  req.session.newUserValidated = false

  if(nameRequisites(req.body.name)){
    if(passRequisites(req.body.password)){
      if(emailRequisites(req.body.email)){
        req.session.newUserValidated = true
      }
    } else{
      message = `Password has few than 5 elements`
    }
  } else{
    message = `Name has few than 5 elements`
  }

  if(message){
    req.session.newUserMessage = message
  }
  next()
}