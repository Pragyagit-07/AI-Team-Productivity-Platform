const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadFile } = require('../controllers/fileController');

router.post('/', authMiddleware, upload.single('file'), uploadFile);

module.exports = router;
