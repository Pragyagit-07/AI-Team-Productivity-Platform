const express = require('express');
const router = express.Router();
const controller = require('../controllers/branchController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware,controller.createBranch);
router.get('/', authMiddleware,controller.getBranches);
router.get('/:id', authMiddleware, controller.getBranchById);
router.put('/:id', authMiddleware, controller.updateBranch);
router.delete('/:id',authMiddleware, controller.deleteBranch);

module.exports = router;
