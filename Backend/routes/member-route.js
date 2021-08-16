const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member-controller');

router.post('/addMember',memberController.AddMember);
router.get('/',memberController.ViewMembers);

module.exports = router;