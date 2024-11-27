import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database.js';
import { uploadFile, deleteFile } from '../services/storageService.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to check if user is admin
router.use(isAdmin);

// Upload media files
router.post('/media/upload', upload.array('images', 10), async (req, res) => {
  try {
    const uploadedFiles = [];
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      for (const file of req.files) {
        const { url, filename } = await uploadFile(file, 'rooms');
        
        const [result] = await connection.execute(
          'INSERT INTO room_images (id, imageUrl) VALUES (?, ?)',
          [uuidv4(), url]
        );

        uploadedFiles.push({
          id: result.insertId,
          url,
          name: file.originalname,
          uploadDate: new Date().toISOString(),
          size: file.size
        });
      }

      await connection.commit();
      res.json(uploadedFiles);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

// Delete media files
router.post('/media/delete', async (req, res) => {
  try {
    const { ids } = req.body;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      for (const id of ids) {
        const [images] = await connection.execute(
          'SELECT imageUrl FROM room_images WHERE id = ?',
          [id]
        );

        if (images.length > 0) {
          const filename = new URL(images[0].imageUrl).pathname.split('/').pop();
          await deleteFile(filename);
          
          await connection.execute(
            'DELETE FROM room_images WHERE id = ?',
            [id]
          );
        }
      }

      await connection.commit();
      res.json({ message: 'Files deleted successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete files' });
  }
});

export default router;