const express = require('express');
const router = express.Router();
const controller = require('../controllers/orgUserController');

router.post('/', controller.createOrgUser);
router.get('/', controller.getOrgUsers);
router.get('/branch/:branchId', controller.getOrgUsersByBranch);

router.get('/:id', controller.getOrgUserById);
router.put('/:id', controller.updateOrgUser);
router.delete('/:id', controller.deleteOrgUser);

module.exports = router;
