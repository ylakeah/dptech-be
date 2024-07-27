const Sequelize  = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Admin = require('../models/Admin')
const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create Admin
exports.createAdmin = async (req, res) => {
    const { firstName, lastName, email, dateOfBirth, gender, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await db.Admin.create({
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            password: hashedPassword
        });
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read Admin
exports.getAdmins = async (req, res) => {
    try {
        const admins = await db.Admin.findAll();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Admin
exports.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, dateOfBirth, gender, password } = req.body;
    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const [updated] = await db.Admin.update({
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            ...(password && { password: hashedPassword })
        }, {
            where: { id }
        });
        if (updated) {
            const updatedAdmin = await db.Admin.findOne({ where: { id } });
            res.status(200).json(updatedAdmin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await db.Admin.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await db.Admin.findOne({ where: { email } });
        if (!admin) return res.status(404).json({ error: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: admin.id, email: admin.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Admin Profile
exports.getProfile = async (req, res) => {
    const { id } = req.user;
    try {
        const admin = await db.Admin.findOne({ where: { id } });
        if (!admin) return res.status(404).json({ error: 'Admin not found' });
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
