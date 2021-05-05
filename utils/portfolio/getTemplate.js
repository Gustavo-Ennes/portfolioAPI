module.exports = (templateName) => {
  let template = null
  
  switch(templateName){
    case "WelcomeTemplate":
      template = require('./welcomeTemplate')
    break;
    default: break
  }

  return template
}