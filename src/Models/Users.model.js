import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const Userschema = new Schema({
  Username: { type: String, required: true },
  Fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  ProfileImage: { type: String },
  Bookmark: [{type: Schema.Types.ObjectId , ref : "Blogs"}],
});

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", Userschema);
