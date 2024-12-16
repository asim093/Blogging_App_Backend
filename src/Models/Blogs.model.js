import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const Blogschema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  BlogImage: { type: String, required: true },
  BookMarkByUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
});

export default mongoose.model("Blogs", Blogschema);
