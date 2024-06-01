import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type: String, required: true},
    city: {type: String, required: true},
    gender: {type: String, required: true},
    address: {type: String, required: true},
    password: { type: String, required: true },
    tokens: {type: Number, required: true},
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;