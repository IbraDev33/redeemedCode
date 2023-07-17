var express = require('express');
var router = express.Router();
let RedeemedCode = require('../redeemedCode')
let Code = require('../code')
let sendCode = require('../elasticMailCode')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/redeem-code',async function(req,res){


  const { orderID, purchasedProduct, email, redeemedCode } = req.body;

Code.findOne({ code: redeemedCode, used: false })
  .then((c) => {
    if (c != null) {
      console.log(c)
      const redeemedCodez = new RedeemedCode({
        orderID,
        title:c.title,
        purchasedProduct,
        email,
        redeemedCode
      });

      // Save the redeemed code to the database
      redeemedCodez.save()
        .then(async () => {
          // Update the 'used' field of the code
          await Code.updateOne({ code: redeemedCode }, { used: true })
            .then((d) => {
              // Send a success response
               sendCode()
              res.json({ success: true });
            })
            .catch(error => {
              console.error('Error updating code:', error);
              // Send an error response
              res.status(500).json({ success: false });
            });
        })
        .catch(error => {
          console.error('Error saving redeemed code:', error);
          // Send an error response
          res.status(500).json({ success: false });
        });
    } else {
      // Code not found or already used
      res.status(500).json({ success: false });
    }
  })
  .catch((err) => {
    console.error('Error finding code:', err);
    res.status(500).json({ success: false });
  });


//   const { orderID, email, redeemedCode } = req.body;

// // console.log( orderID, email, redeemCode)


//   Code.findOne({code:redeemedCode,used:false}).then((c)=>{
//    if(c !=null){
//     const redeemedCodez = new RedeemedCode({
//       orderID,
//       email,
//       redeemedCode
//     });
  
//      // Save the redeemed code to the database
//      redeemedCodez.save()
//      .then(async () => {
//        // Send a success response
//        await Code.updateOne({ code:redeemedCode }, { used:true }).then((d)=>{
//        res.json({ success: true });
  
//        })
    
  
//      })
//      .catch(error => {
//        console.error('Error saving redeemed code:', error);
//        // Send an error response
//        res.status(500).json({ success: false });
//      });
  
//    }

//    else{
//     res.status(500).json({ success: false });
//    }
//       // Create a new redeemed code instance
 

//   }).catch((err)=>{
//     res.status(500).json({ success: false });
//   })

 

})

module.exports = router;
