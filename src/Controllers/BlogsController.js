import BlogsModel from "../Models/Blogs.model.js";

export const Addblogs = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Please upload the image" });
  }

  try {
    const blogs = await BlogsModel.create({
      title,
      description,
      BlogImage: req.file.path,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const Allblogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  try {
    const blogs = await BlogsModel.find()
      .populate("createdBy", "Username  email  ProfileImage  ")
      .skip(skip)
      .limit(limit);

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "Blogs not found" });
    }

    const totalBlogs = await BlogsModel.countDocuments();

    res.status(200).json({
      message: "All Blogs Found",
      blogs,
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const Editblogs = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  if (!id) {
    return res.status(400).json({ message: "Blog Id Not Provided" });
  }

  const blog = await BlogsModel.findById(id);

  if (!blog) {
    return res.status(404).json({ message: "Blog Not Found" });
  }

  const updateData = {
    title,
    description,
    createdBy: req.user._id,
  };

  if (req.file) {
    updateData.BlogImage = req.file.path;
  } else {
    res.status(401).json({ message: "Image NOt Uploaded" });
  }

  try {
    const updatedBlog = await BlogsModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const Patchblogs = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const blog = await BlogsModel.findById(id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (title) blog.title = title;
  if (description) blog.description = description;
  if (req.file) blog.BlogImage = req.file.path;

  try {
    const updatedBlog = await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const Singleblog = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "Id is Not provided" });
  }

  const singleblog = await BlogsModel.findById(id);

  if (!singleblog) {
    return res.status(401).json({ message: "Blog Not Found" });
  }
  res.status(200).json({ message: "Blog Found", singleblog });
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "Id is Not provided" });
  }

  const blog = await BlogsModel.findByIdAndDelete(id);

  if (!blog) {
    return res.status(401).json({ message: "Blog Not Found" });
  }

  res.status(200).json({ message: "Blog Deleted SuccessFully", blog });
};
