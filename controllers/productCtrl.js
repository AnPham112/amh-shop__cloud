const Products = require('../models/productModel')

// Filter, sorting and paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString } //  Receive req.query from client side (queryString = req.query)
    const excludedFields = ['page', 'sort', 'limit']

    // Get queryObj after removing elements in excludedFields array 
    excludedFields.forEach(elm => delete (queryObj[elm]));
    let queryStr = JSON.stringify(queryObj)

    // $gte (greater than || equal): selects the documents where the value of the field is greater than or equal to a specified value
    // $gt (greater than): selects those documents where the value of the field is grater than the specified value
    // $lt (less than): selects the documents where the value of the field is less than the specified value.
    // $lte (less than || equal): selects the documents where the value of the field is less than or equal to the specified value.
    // $regex: selects the approximate values according to the key in the req.query received from the client 
    // For example: localhost:5000/api/products?title[$regex]=wo => "title": "woman"
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
    this.query.find(JSON.parse(queryStr))
    return this
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      console.log(sortBy)
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }
    return this
  }
  paginating() {
    // *1 to convert String data to Number
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 4
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating()
      const products = await features.query
      res.json({
        status: 'success',
        result: products.length,
        products: products
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id)
      if (!product) {
        return res.status(404).json({ msg: 'This product does not exist.' })
      }
      return res.json(product)
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  createProduct: async (req, res) => {
    try {
      const { product_id, title, price, description, productImages, category } = req.body

      if (!productImages.length) return res.status(400).json({ msg: "No images uploaded" })

      const product = await Products.findOne({ product_id })
      if (product) return res.status(400).json({ msg: "This product already exists" })

      const newProduct = new Products({
        product_id, title: title.toLowerCase(), price, description, productImages, category
      })

      // save new product to MongoDB
      await newProduct.save((error, product) => {
        if (error) return res.status(400).json({ error })
        if (product) return res.json({ product })
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id)
      res.json({ msg: "Product deleted" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, productImages, category } = req.body
      if (!productImages) return res.status(400).json({ msg: "No images uploaded" })

      await Products.findByIdAndUpdate(req.params.id, {
        title: title.toLowerCase(), price, description, productImages, category
      })
      res.json({ msg: "Product updated" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = productCtrl