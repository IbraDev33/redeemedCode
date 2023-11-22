function loginadmin(req,res,next){
    
    let userInputID = req.body.adminid
    let userInputPass = req.body.password
  
    if(userInputID !=process.env.adminID || userInputPass !=process.env.adminPassword){
      res.render('admin-error')
      return
    }
    if(userInputID ==process.env.adminID && userInputPass ==process.env.adminPassword){
      req.session.regenerate(function (err) {
        if (err) next(err)
        req.session.user = process.env.adminID
        req.session.save(function (err) {
          if (err) return next(err)
          Code.find({}).then((code)=>{
            RedeemedCode.find({}).then((rc)=>{
              res.render('admin-dashboard',{codes:code,rc:rc})
      
              })
          })
        })
      })
    }
}

function registeradmin(req,res,next){
}