import mongoose from "mongoose"; // import mongoose library
import bcrypt from 'bcryptjs'

// define type of UserType included its properties for a user doc in MongoDB collection
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// create a mongoose schema for the user, specifying the structure for each field
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
});

// as a middleware for mongodb and handling the hash logic here 
userSchema.pre("save", async function(next) {
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 8)
  }
  next();
})

// create a mongoose model named User based on the userSchema, also specifies the type
const User = mongoose.model<UserType>("User", userSchema);

// export the User model for use in other parts of the application, 
// allowing interact with the MongoDB collection named users
export default User;
