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
    });

    res.status(201).json({
      message: "Blog created successfully",
      blogs
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
