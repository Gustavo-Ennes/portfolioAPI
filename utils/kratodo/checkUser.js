/*

I have to implement username and passwords regex validations, and also for the email

*/

const nameRequisites = (name) => {return name.length > 5}
const passRequisites = (pass) => {return pass.length > 5}


module.exports = async(req, res, next) => {
  let message = null
  req.body.newUserValidated = false

  if(nameRequisites(req.body.name)){
    if(passRequisites(req.body.password)){
      req.body.newUserValidated = true
    } else{
      message = `Password has few than 5 elements`
    }
  } else{
    message = `Name has few than 5 elements`
  }

  if(message){
    req.body.newUserMessage = message
  }
  next()
}