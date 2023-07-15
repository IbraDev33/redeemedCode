var express = require('express');
var router = express.Router();
let Code = require('../code')
//const shortid = require('shortid');
let RedeemedCode = require('../redeemedCode')


/* GET home page. */
router.get('/', isAuthenticated2,function(req, res, next) {
  

  
  res.render('admin-index');
});

router.post('/login',function(req,res,next){
    
  let userInputID = req.body.adminid
  let userInputPass = req.body.password

 

 
  
  if(userInputID !=process.env.adminID || userInputPass !=process.env.adminPassword){
    res.render('admin-error')
    return
  }

  
  
  if(userInputID ==process.env.adminID && userInputPass ==process.env.adminPassword){
    req.session.regenerate(function (err) {
      if (err) next(err)
  
      // store user information in session, typically a user id
      req.session.user = process.env.adminID
  
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err)
        Code.find({}).then((code)=>{
          RedeemedCode.find({}).then((rc)=>{
            res.render('admin-dashboard',{codes:code,rc:rc})
    
            })
      //  res.render('admin-dashboard',{codes:code})

        })
    
       
      })
    })
  }



  


})



router.post('/create-codes',isAuthenticated,async function(req,res){

  const numberOfCodes = Number(req.body.number)
// const code = shortid.generate(); // Generates a short unique code
  let    code = generateCustomShortID()
let generatedCodes = []

for(i=0;i<numberOfCodes;i++){
  generatedCodes.push({code:generateCustomShortID(),used:false})
}

 

Code.insertMany(generatedCodes).then((d)=>{
  res.status(200).end('OK!')
}).catch((err)=>{
  res.status(500).end(err)
})

  // console.log(generatedCodes)
  // res.send('6')
 

})

// Code.deleteMany().then((d)=>{
//   console.log(d)
// })





function isAuthenticated (req, res, next) {
  //  console.log(req)
  
    if (req.session.user) {
      next()
      
  
    }
    else res.redirect('/admin')
  }


  
function isAuthenticated2 (req, res, next) {
  //  console.log(req)
  
    if (req.session.user) {
      // next()
      Code.find({}).then((code)=>{
        RedeemedCode.find({}).then((rc)=>{
        res.render('admin-dashboard',{codes:code,rc:rc})
        
        })
 
         })
      // res.render('admin-dashboard',{codes:getCodes()})
  
    }
    else next()
  }

  async function getCodes(){
   let Codes =  Code.find({})
   console.log(Codes)
   return Codes

  }


  function generateCustomShortID() {
    let id = '';
  
    // Generate 3 or 2 random numbers
    const randomNumberCount = Math.random() < 0.5 ? 3 : 2;
    for (let i = 0; i < randomNumberCount; i++) {
      const randomNumber = Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
      id += randomNumber;
    }
  
    // Generate 6 or 7 random uppercase alphabets
    const randomAlphabetCount = Math.random() < 0.5 ? 6 : 7;
    for (let i = 0; i < randomAlphabetCount; i++) {
      const randomAlphabet = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Generate a random uppercase alphabet
      id += randomAlphabet;
    }
  
    return id;
  }
  

module.exports = router;
