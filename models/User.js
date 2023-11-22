let mongoose = require('mongoose') 

let UserSchema = mongoose.Schema({
    email:{type:String},
    password:{type:String},
    role:{type:String},
})

module.exports = mongoose.model('User',UserSchema)