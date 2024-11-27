import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database.js';
import { authLimiter, handleRefreshToken } from '../middleware/auth.js';
import { sendPasswordReset } from '../services/emailService.js';

const router = express.Router();

// Login
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = await pool.getConnection();

    try {
      const [users] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }

      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ accessToken, refreshToken });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    const connection = await pool.getConnection();

    try {
      const [existing] = await connection.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existing.length > 0) {
        return res.status(400).json({ error: 'Email déjà utilisé' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4();

      await connection.execute(
        'INSERT INTO users (id, email, password, firstName, lastName, phone) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, email, hashedPassword, firstName, lastName, phone]
      );

      const accessToken = jwt.sign(
        { id: userId, role: 'user' },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({ accessToken, refreshToken });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
});

// Refresh token
router.post('/refresh-token', handleRefreshToken);

// Request password reset
router.post('/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    const connection = await pool.getConnection();

    try {
      const [users] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      const user = users[0];
      const resetToken = jwt.sign(
        { id: user.id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '1h' }
      );

      await sendPasswordReset(user, resetToken);
      res.json({ message: 'Email de réinitialisation envoyé' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ error: 'Erreur lors de la demande de réinitialisation' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const connection = await pool.getConnection();

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.execute(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, decoded.id]
      );

      res.json({ message: 'Mot de passe mis à jour' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Erreur lors de la réinitialisation du mot de passe' });
  }
});

export default router;