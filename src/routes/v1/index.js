import express from 'express'
import productRoutes from './product.routes.js'
import userRoutes from './user.routes.js'
import categoryRoutes from './category.routes.js'

const router = express.Router()

router.use('/products', productRoutes)
router.use('/users', userRoutes)
router.use('/category', categoryRoutes)

export default router
