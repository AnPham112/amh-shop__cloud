const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find()
      res.json(categories)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      // if user have role = 1 -> admin
      // Only admin can create, delete and update category
      const { name } = req.body
      const category = await Category.findOne({ name: name })
      if (category) return res.status(400).json({ msg: "This category already exists" })
      const newCategory = new Category({ name })
      await newCategory.save((error, category) => {
        if (error) return res.status(400).json({ error })
        if (category) return res.json({ category })
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({ category: req.params.id })
      if (products) return res.status(400).json({ msg: "Please delete all products with a relationship" })
      await Category.findByIdAndDelete(req.params.id)
      res.json({ msg: "Category deleted" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body
      await Category.findByIdAndUpdate(req.params.id, { name })
      res.json({ msg: "Category updated" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = categoryCtrl