const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/auth');

router.post('/', adminController.createAdmin);
router.get('/', authenticateToken, adminController.getAdmins);
router.put('/:id', authenticateToken, adminController.updateAdmin);
router.delete('/:id', authenticateToken, adminController.deleteAdmin);
router.post('/login', adminController.login);
router.get('/profile', authenticateToken, adminController.getProfile);

module.exports = router;
