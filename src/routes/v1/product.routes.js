import express from 'express'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getByIdProduct,
  updatedProduct
} from '../../controllers/product.controller.js'
import upload from '../../config/multer.config.js'

const router = express.Router()

router.get('/', getAllProducts)
router.post('/', upload.single('image'), createProduct)
router.put('/:id', upload.single('image'), updatedProduct)
router.get('/:id', getByIdProduct)
router.delete('/:id', deleteProduct)

export default router
