import Category from '../models/category.model.js'


const createCategory = async (req, res, next) => {
  const { category } = req.body
  try {
    const existCategory = await Category.findByName(category)
    if (existCategory) {
      return res
        .status(400)
        .json({ status: false, message: 'Category is exist already' })
    }

    const createCategory = await Category.create({ category })
    res.status(201).json({
      status: true,
      message: 'Category created successfully',
      data: createCategory
    })
  } catch (error) {
    next(error)
  }
}

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json({
      status: true,
      message: 'Categories get all successfully',
      data: categories
    })
  } catch (error) {
    next(error)
  }
}

const getByIdCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const category = await Category.findById(id)
    res.status(200).json({
      status: true,
      message: `Category by id ${id} found successfully`,
      data: category
    })
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedCategory = await Category.deleteById(id)
    res.status(200).json({
      status: true,
      message: 'Category deleted successfully',
      data: deletedCategory
    })
  } catch (error) {
    next(error)
  }
}

const updatedCategory = async (req, res, next) => {
  try {
    const { category, status } = req.body
    const { id } = req.params
    const updateCategory = await Category.update(id, { category, status })
    res.status(200).json({
      status: true,
      message: 'Category updated successfully',
      data: updateCategory
    })
  } catch (error) {
    next(error)
  }
}

export {
  createCategory,
  getAllCategories,
  getByIdCategory,
  deleteCategory,
  updatedCategory
}
