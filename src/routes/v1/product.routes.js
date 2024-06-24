import express from 'express'
import {
  createProduct,
  getAllProducts
} from '../../controllers/product.controller.js'
import upload from '../../config/multer.config.js'

const router = express.Router()

router.get('/', getAllProducts)
router.post('/', upload.single('image'), createProduct)

export default router
