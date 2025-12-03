import { Request, Response, Router } from 'express';
import pool from '../config/database';

const router = Router();

// GET all offers
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id, o.title, o.description, o.discount_percentage,
        o.original_price, o.final_price, o.currency, o.image_url,
        o.valid_until, v.name as venue_name
      FROM offers o
      LEFT JOIN venues v ON o.venue_id = v.id
      WHERE o.is_active = true 
        AND (o.valid_until IS NULL OR o.valid_until > NOW())
      ORDER BY o.discount_percentage DESC
      LIMIT 20
    `);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch offers',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST - Add new offer
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      discount_percentage,
      original_price,
      image_url,
      category_id
    } = req.body;

    if (!title || !original_price || !discount_percentage) {
      return res.status(400).json({
        success: false,
        message: 'Title, original_price, and discount_percentage are required'
      });
    }

    // Calculate final price
    const final_price = original_price - (original_price * discount_percentage / 100);

    const result = await pool.query(
      `INSERT INTO offers (
        title, description, discount_percentage, original_price, 
        final_price, image_url, category_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [title, description, discount_percentage, original_price, final_price, image_url, category_id]
    );

    res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create offer',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
