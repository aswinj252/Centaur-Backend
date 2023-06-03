import multer from "multer"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const single =upload.single('file')

export default single