const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator= require("validator")
const jwt = require("jsonwebtoken")

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[6,"Password must be 6 characters long"]
    },
    age:{
        type:Number,
        default:0
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
      
    ]
})


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.tokens
    delete userObject.password
    return userObject
}

userSchema.methods.generateAuthToken = async function(req, res)
{
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},process.env.SECRET_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials=async (email,password) =>
{
    
  const user = await User.findOne({email})
  if(!user)
  {
      throw "Invalid credentials"
  }
  const isMatch = await bcrypt.compare(password,user.password)
  if(!isMatch)
  {
    throw "Invalid credentials"
  }
  return user
}

userSchema.pre("save",async function(next){
    const user = this
    if(user.isModified("password"))
    {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
}
)

const User = new mongoose.model("User",userSchema)

module.exports = User