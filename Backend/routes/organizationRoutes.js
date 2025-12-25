// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/organizationController');
// const authMiddleware = require('../middleware/authMiddleware');


// router.post('/', authMiddleware, controller.createOrganization);
// router.get('/', authMiddleware, controller.getOrganizations);
// router.get('/:id', authMiddleware, controller.getOrganizationById);
// router.put('/:id', authMiddleware, controller.updateOrganization);
// router.delete('/:id', authMiddleware, controller.deleteOrganization);

// module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/organizationController');
const authMiddleware = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminOnly');

router.post('/', authMiddleware, adminOnly, controller.createOrganization);
router.get('/', authMiddleware, adminOnly, controller.getOrganizations);
router.get('/:id', authMiddleware, adminOnly, controller.getOrganizationById);
router.put('/:id', authMiddleware, adminOnly, controller.updateOrganization);
router.delete('/:id', authMiddleware, adminOnly, controller.deleteOrganization);

module.exports = router;
