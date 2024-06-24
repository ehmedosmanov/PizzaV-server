import Product from '../models/product.model.js'

const getAllProducts = async (req, res, next) => {
  try {
    const data = await Product.findAll()

    res.status(200).json({
      status: true,
      message: 'Product data received successfully',
      data,
      length: data.length
    })
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  const { name, category_id, description, status } = req.body
  const file = req.file
  try {
    const existProduct = await Product.findByName(name)
    if (existProduct) {
      return res
        .status(400)
        .json({ status: false, message: 'Product is exist already' })
    }
    console.log(file)
    const createProduct = await Product.create({
      name,
      category_id,
      description,
      image: file ? file.filename : null,
      status
    })
    res.status(201).json({
      status: true,
      message: 'Product created successfully',
      data: createProduct
    })
  } catch (error) {
    next(error)
  }
}

const getByIdProduct = async (req, res, next) => {
  const { id } = req.params
  try {
    const category = await Product.findById(id)
    res.status(200).json({
      status: true,
      message: `Product by id ${id} found successfully`,
      data: category
    })
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedProduct = await Product.deleteById(id)
    res.status(200).json({
      status: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    })
  } catch (error) {
    next(error)
  }
}

const updatedProduct = async (req, res, next) => {
  try {
    const { name, category_id, description, image } = req.body
    const { id } = req.params
    const file = req.file
    const updateCategory = await Product.update(id, {
      name,
      category_id,
      description,
      image: file ? file.filename : null
    })
    res.status(200).json({
      status: true,
      message: 'Product updated successfully',
      data: updateCategory
    })
  } catch (error) {
    next(error)
  }
}

export {
  getAllProducts,
  getByIdProduct,
  createProduct,
  deleteProduct,
  updatedProduct
}
