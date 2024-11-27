import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import pool from '../config/database.js';

// Rate limiting
export const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),
  message: 'Trop de tentatives de connexion, veuillez réessayer plus tard.'
});

// JWT Authentication
export const authenticateJWT = expressjwt({
  secret: process.env.JWT_ACCESS_SECRET,
  algorithms: ['HS256']
});

// Admin check middleware
export const isAdmin = (req, res, next) => {
  if (req.auth?.role !== 'admin') {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  next();
};

// Refresh token middleware
export const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token requis' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const connection = await pool.getConnection();

    try {
      const [users] = await connection.execute(
        'SELECT id, email, role FROM users WHERE id = ?',
        [decoded.id]
      );

      if (users.length === 0) {
        throw new Error('Utilisateur non trouvé');
      }

      const user = users[0];

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' }
      );

      const newRefreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ accessToken, refreshToken: newRefreshToken });
    } finally {
      connection.release();
    }
  } catch (error) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
};