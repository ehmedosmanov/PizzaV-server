import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// cb(null, path.join(__dirname, '../uploads'))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const fileFilter = function (req, file, cb) {
  const allowedFileTypesImages = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf'
  ]
  if (allowedFileTypesImages.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Not allowed'))
  }
}

const limits = {
  fileSize: 10 * 1024 * 1024 // 10 MB
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
})

export default upload
