require('dotenv').config()

const mailjet = require('node-mailjet').connect(
  process.env.MJ_API_PUBLIC,
  process.env.MJ_API_PRIVATE
)

// send mail function
// to = MUST BE A ARRAY OF STRINGS
// from = String, required: false
function getMessages(to, from=process.env.SENDER_MAIL){
  let isArray = function(a) {
    return (!!a) && (a.constructor === Array);
  };  
  let messages = []
  if(to.length > 0){
    for(let i = 0; i < to.length; i++){
      messages.push(
        {
          From: {
            Email:`${from}`,
            Name: 'Ennes, Gustavo',
          },
          To: [
            {
              Email: `${to[i]}`,
              Name: `${to[i].split('@')[0]}`,
            },
          ],
          Subject: 'My first Mailjet Email!',
          TextPart: 'Greetings from Mailjet!',
          HTMLPart:
            '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
        }
      )
    }
  }
  console.log("Messages:\n" + JSON.stringify(messages))
  return messages
}

async function sendMail(to){
  try{
    return await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: getMessages(to)
    })
  }catch(err){
    console.log(err)
  }
}

module.exports = sendMail