

const express = require('express');
const router = express.Router();
const controller = require('../controllers/orgUserController');
const authMiddleware = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminOnly');

router.post('/', authMiddleware, adminOnly, controller.createOrgUser);
router.get('/', authMiddleware, adminOnly, controller.getOrgUsers);
router.get('/branch/:branchId', authMiddleware, adminOnly, controller.getOrgUsersByBranch);
router.get('/:id', authMiddleware, adminOnly, controller.getOrgUserById);
router.put('/:id', authMiddleware, adminOnly, controller.updateOrgUser);
router.delete('/:id', authMiddleware, adminOnly, controller.deleteOrgUser);

module.exports = router;
