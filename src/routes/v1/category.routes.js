import express from 'express'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getByIdCategory,
  updatedCategory
} from '../../controllers/category.controller.js'

const router = express.Router()

router.post('/', createCategory)
router.get('/', getAllCategories)
router.get('/:id', getByIdCategory)
router.delete('/:id', deleteCategory)
router.put('/:id', updatedCategory)

export default router
