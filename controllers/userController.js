const code = require("../code")
const User = require("../models/User")
const redeemedCode = require("../redeemedCode")
const bcrypt=require('bcrypt')
//login
const login=async(req,res,next)=>{
    
     const { email, password,repat } = req.body;
     const user = await User.findOne({email:email});
     if (!user) {
      res.render('admin-error')
      return
     }
     const isPasswordValid = await bcrypt.compare(password, user.password);

     if (!isPasswordValid) {
      res.render('admin-error')
      return
     }
     req.session.regenerate(function (err) {
      if (err) next(err)
      // store user information in session, typically a user id
      req.session.user = user.email
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err)
        code.find({}).then((code)=>{
          redeemedCode.find({}).then((rc)=>{
            res.render('admin-dashboard',{codes:code,rc:rc})
          })
        })
      })
    })
   
}
//register
function firstRegister(req,res,next){
  const { email, password,repat } = req.body;
  if (isValidEmail(email)) {
    if(password===repat){
        bcrypt.hash(req.body.password, 10).then(
        (hash) => {
          const user = new User({
            email: email,
            password: hash,
            role:'admin'
          });
          user.save().then(
            () => {
              res.redirect('/admin/')
            }
          ).catch(
            (error) => {
              res.send('error');
            }
          );
        }
      );
    }else{
      req.flash('error', 'Invalid credentials');
      res.redirect('/admin')
    }
  } else {
    req.flash('error', 'Invalid email adresse');
    res.redirect('/admin')
  }
}
//logout
function logout(req, res, next) {
    // Destroy the session to log the user out
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      // Redirect the user to the login page or any other desired page after logout
      res.redirect('/');
    });
}
//valide email
function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

//modifier password account
const modifier=async (req,res,next)=>{
      const {lastpassword,newpassword}=req.body
      const userEmail = req.session.user;
      const user = await User.findOne({email:userEmail});
      
      const isPasswordValid = await bcrypt.compare(lastpassword, user.password);
     
     if (!isPasswordValid) {
      req.flash('errorModifier', 'Invalid last password');
      res.redirect('/admin/admin-profile')
     }
      
     const hashedPassword = await bcrypt.hash(newpassword, 10);

     // Update the user's password field
     user.password = hashedPassword;
 
     // Save the updated user object to the database
     await user.save();
     req.flash('successModifier', 'success....!!!');
     res.redirect('/admin/admin-profile')
}
const profile=async (req,res,next)=>{
  const errorModifier = req.flash('errorModifier');
  const successModifier = req.flash('successModifier');
  res.render('modifier-account',{errorModifier,successModifier})
}
module.exports = { logout,login,firstRegister,modifier,profile };