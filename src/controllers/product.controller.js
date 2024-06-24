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

export { getAllProducts, createProduct }
