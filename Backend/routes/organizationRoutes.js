const express = require('express');
const router = express.Router();
const controller = require('../controllers/organizationController');

router.post('/', controller.createOrganization);
router.get('/', controller.getOrganizations);
router.get('/:id', controller.getOrganizationById);
router.put('/:id', controller.updateOrganization);
router.delete('/:id', controller.deleteOrganization);

module.exports = router;
