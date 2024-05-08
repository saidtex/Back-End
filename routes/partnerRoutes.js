const express = require('express');
const router = express.Router();
const controller = require('../controllers/partnerController')

router.get('/',controller.getAll);
router.post('/',controller.createPartner);
router.delete('/:id',controller.deletePartner);

module.exports = router;
