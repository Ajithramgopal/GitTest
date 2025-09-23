const CategoryModel = require("../models/categoryModel");

exports.createCategory = (req, res) => {
  CategoryModel.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Category created successfully" });
  });
};

exports.getAllCategories = (req, res) => {
  CategoryModel.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.updateCategory = (req, res) => {
  CategoryModel.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated successfully" });
  });
};

exports.deleteCategory = (req, res) => {
  CategoryModel.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  });
};
