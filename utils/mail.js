require('dotenv').config()
const htmlTemplateText = require('./welcomeTemplate')

const mailjet = require('node-mailjet').connect(
  process.env.MJ_API_PUBLIC,
  process.env.MJ_API_PRIVATE
)

// send mail function
// to = MUST BE A ARRAY OF STRINGS
// from = String, required: false
function getMessages(to, from){
  
  let messages = []
  if(to.length > 0){
    for(let i = 0; i < to.length; i++){

      let obj = {
        From: {
          Email:`${from || "gustavo@ennes.dev"}`,
          Name: 'Ennes, Gustavo', 
        },
        To: [
          {
            Email: `${to[i]}`,
            Name: `${to[i].split('@')[0]}`,
          },
        ],
        Subject: 'My first Mailjet Email!',
        HTMLPart: htmlTemplateText

      }
      messages.push(obj)
    }
  }
  console.log("Messages:\n" + JSON.stringify(messages))
  return messages
}

async function sendMail(to, from){
  try{
    return await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: getMessages(to, from)
    })
  }catch(err){
    console.log(err)
  }
}

module.exports = sendMail