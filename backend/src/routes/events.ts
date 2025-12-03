import { Router, Request, Response } from 'express';
import pool from '../config/database';

const router = Router();

// GET all events
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        e.id, e.title, e.slug, e.description, e.short_description,
        e.image_url, e.event_date, e.start_time, e.end_time,
        e.price_min, e.price_max, e.currency, e.is_featured,
        v.name as venue_name, v.city as venue_city,
        c.name as category_name
      FROM events e
      LEFT JOIN venues v ON e.venue_id = v.id
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.is_active = true AND e.status = 'upcoming'
      ORDER BY e.event_date ASC, e.start_time ASC
      LIMIT 20
    `);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST - Add new event
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      short_description,
      image_url,
      event_date,
      start_time,
      price_min,
      category_id
    } = req.body;

    if (!title || !event_date || !start_time) {
      return res.status(400).json({
        success: false,
        message: 'Title, event_date, and start_time are required'
      });
    }

    // Generate slug from title
    const slug = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

    const result = await pool.query(
      `INSERT INTO events (
        title, slug, description, short_description, image_url,
        event_date, start_time, price_min, category_id, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'upcoming')
      RETURNING *`,
      [title, slug, description, short_description, image_url, event_date, start_time, price_min || 0, category_id]
    );

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
