const axios = require('axios')

function sendEmail(){
axios.post('https://api.elasticemail.com/v2/email/send?apikey=EBBF32E62A632CBB4C1A387238AA50FB31481F561C5631C89B21AC3CB915AB1877DAF00ABB73CB661A0617297EF0BE0E&subject=CODE REDEMPTION STATUS&from=ibrahimoyetunjiib@gmail.com&bodyText=This is to notify you that your code has been redeemed succesfuly&to=ibrahim130860011@gmail.com').then((r)=>{
    console.log(r)
}).catch((err)=>{
    console.log(err)
})
}

module.exports = sendEmail