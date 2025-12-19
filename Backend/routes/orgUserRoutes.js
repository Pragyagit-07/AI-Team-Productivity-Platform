const express = require('express');
const router = express.Router();
const controller = require('../controllers/orgUserController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, controller.createOrgUser);
router.get('/', authMiddleware, controller.getOrgUsers);
router.get('/branch/:branchId', authMiddleware, controller.getOrgUsersByBranch);
router.get('/:id', authMiddleware, controller.getOrgUserById);
router.put('/:id', authMiddleware, controller.updateOrgUser);
router.delete('/:id', authMiddleware, controller.deleteOrgUser);

module.exports = router;
