
function sendEmail(toMail,product,code,email2){


const emailjs = require('@emailjs/nodejs');

var templateParams = { toMail: toMail,product: product,code: code}

emailjs
  .send('service_064toks', 'template_kynxmqz', templateParams, {
    publicKey: 'QgxnJzvlj6n5-ds-N',
    privateKey: 'fNHn5nZLpg3Dd3AeMk13g', // optional, highly recommended for security reasons
  })
  .then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
    },
    function (err) {
      console.log('FAILED...', err);
    },
  );


//admin email
setTimeout(()=>{

var templateParams2 = { toMail: email2,product: product,code: code}

  emailjs
  .send('service_064toks', 'template_kynxmqz', templateParams2, {
    publicKey: 'QgxnJzvlj6n5-ds-N',
    privateKey: 'fNHn5nZLpg3Dd3AeMk13g', // optional, highly recommended for security reasons
  })
  .then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
    },
    function (err) {
      console.log('FAILED...', err);
    },
  );
},10000)






}



module.exports = sendEmail