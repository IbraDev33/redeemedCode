let mongoose = require('mongoose') 



 let redeemedCodeSchema = mongoose.Schema({
    email:{type:String},
    orderID:{type:String},
    title:{type:String},
    redeemedCode:{type:String},
    purchasedProduct:{type:String}
 })

 module.exports = mongoose.model('redeemedCode',redeemedCodeSchema)