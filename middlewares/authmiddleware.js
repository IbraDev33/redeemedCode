// authMiddleware.js

const code = require("../code")
const User = require("../models/User")
const redeemedCode = require("../redeemedCode")

const isAuthenticatedAdmin =async (req, res, next)=>{
    const user = await User.find({});
  
    if (user.length===0) {
      const errorMessage = req.flash('error');
      res.render('firstadmin',{ errorMessage })  
    }
    else if (req.session.user) {
        // next()
        console.log("bien");
        code.find({}).then((code)=>{
          redeemedCode.find({}).then((rc)=>{
          res.render('admin-dashboard',{codes:code,rc:rc})
          })
      })
    }
   else next()
}

function isAuthenticatedpages(req,res,next){
  if (req.session.user) {
    // User is an admin
    next();
  } else {
    // User is not an admin, handle accordingly
    res.redirect('/admin/')
  }
}
module.exports = { isAuthenticatedAdmin ,isAuthenticatedpages};
  