let mongoose = require('mongoose')

let codeSchema = mongoose.Schema({
    title:{type:String},
    code:{type:String,unique:true},
    used:{type:Boolean}
})



module.exports = mongoose.model('code',codeSchema)