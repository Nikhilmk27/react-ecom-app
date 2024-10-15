const mongoose = require("mongoose")
const UserSchema = new  mongoose.Schema(
    {
        
        name:{
            type:String,
        },
        
        lastname:{
            type:String,
        },

        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
          },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address']
          },

        password: {
            type: String,
            required: true,
            minlength: 6
          },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        otp: {
            type: String,
            required: false
          },
          otpExpiration: {
            type: Date,
          },
          isVerified: {
            type: Boolean,
            default: false
          }
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema)