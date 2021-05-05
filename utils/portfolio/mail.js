require('dotenv').config()
const htmlTemplateText = require('./welcomeTemplate')

const mailjet = require('node-mailjet').connect(
  process.env.MJ_API_PUBLIC,
  process.env.MJ_API_PRIVATE
)
// send mail function
// to = MUST BE A ARRAY OF STRINGS
// from = String, required: false
function getMessages(to, from, subject, html=null, text=null){
  
  let messages = []
  if(to.length > 0 && (html || text) ){
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
        Subject: subject

      }
      html ? obj.HTMLPart = html : obj.TextPart = text
      messages.push(obj)
    }
  }
  console.log("Messages:\n" + messages.length)
  return messages
}

async function sendMail(to, from, subject, html=null, text=null){
  try{
    let res = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: getMessages(to, from, subject, html, text)
    })
    console.log(res)
    return res
  }catch(err){
    console.log(err)
  }
}

module.exports = sendMail