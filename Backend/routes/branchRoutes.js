const express = require('express');
const router = express.Router();
const controller = require('../controllers/branchController');
const authMiddleware = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminOnly');

router.post('/', authMiddleware, adminOnly, controller.createBranch);
router.get('/', authMiddleware, adminOnly, controller.getBranches);
router.get('/:id', authMiddleware, adminOnly, controller.getBranchById);
router.put('/:id', authMiddleware, adminOnly, controller.updateBranch);
router.delete('/:id', authMiddleware, adminOnly, controller.deleteBranch);

module.exports = router;
