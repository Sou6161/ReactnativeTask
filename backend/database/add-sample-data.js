const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sawa_app',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function addSampleData() {
  console.log('\n🎨 Adding Sample Data to Database...\n');

  try {
    const client = await pool.connect();

    // Add Sample Events
    console.log('📅 Adding Events...');
    
    const event1 = await client.query(`
      INSERT INTO events (
        title, slug, description, short_description, image_url,
        event_date, start_time, price_min, category_id, status
      ) VALUES (
        'Tamer Ashour: Feen Concert',
        'tamer-ashour-feen-concert-${Date.now()}',
        'An unforgettable evening with Tamer Ashour performing his hit song Feen and other classics. Experience the magic of Egyptian music at its finest.',
        'Live concert featuring Tamer Ashour',
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop',
        '2025-01-10',
        '20:00',
        350.00,
        5,
        'upcoming'
      ) RETURNING id, title
    `);
    console.log(`   ✅ Added: ${event1.rows[0].title} (ID: ${event1.rows[0].id})`);

    const event2 = await client.query(`
      INSERT INTO events (
        title, slug, description, short_description, image_url,
        event_date, start_time, price_min, category_id, status
      ) VALUES (
        'Amr Diab: The Tribe Event',
        'amr-diab-tribe-event-${Date.now()}',
        'The legendary Amr Diab returns with an exclusive performance. Join thousands of fans for an epic night of music and entertainment.',
        'Exclusive concert with Amr Diab',
        'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=300&fit=crop',
        '2025-01-17',
        '21:00',
        500.00,
        5,
        'upcoming'
      ) RETURNING id, title
    `);
    console.log(`   ✅ Added: ${event2.rows[0].title} (ID: ${event2.rows[0].id})`);

    const event3 = await client.query(`
      INSERT INTO events (
        title, slug, description, short_description, image_url,
        event_date, start_time, price_min, category_id, status
      ) VALUES (
        '80s Retro Disco Night',
        '80s-retro-disco-night-${Date.now()}',
        'Travel back in time to the golden era of disco! Dance to the best hits from the 80s with our resident DJ spinning all night long.',
        'Retro disco party with 80s hits',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
        '2025-01-25',
        '22:00',
        150.00,
        3,
        'upcoming'
      ) RETURNING id, title
    `);
    console.log(`   ✅ Added: ${event3.rows[0].title} (ID: ${event3.rows[0].id})`);

    // Add Sample Offers
    console.log('\n🎁 Adding Offers...');

    const offer1 = await client.query(`
      INSERT INTO offers (
        title, description, discount_percentage, original_price,
        final_price, image_url, category_id
      ) VALUES (
        '10% OFF - Weekend Brunch Special',
        'Enjoy our delicious weekend brunch buffet with a special 10% discount. Includes unlimited coffee, fresh pastries, and main courses.',
        10,
        355.00,
        319.50,
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&h=400&fit=crop',
        2
      ) RETURNING id, title, discount_percentage
    `);
    console.log(`   ✅ Added: ${offer1.rows[0].title} (ID: ${offer1.rows[0].id})`);

    const offer2 = await client.query(`
      INSERT INTO offers (
        title, description, discount_percentage, original_price,
        final_price, image_url, category_id
      ) VALUES (
        '25% OFF - Happy Hour Drinks',
        'Beat the heat with our amazing happy hour deal! Get 25% off all cocktails, beers, and selected wines from 5 PM to 7 PM.',
        25,
        355.00,
        266.25,
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop',
        4
      ) RETURNING id, title, discount_percentage
    `);
    console.log(`   ✅ Added: ${offer2.rows[0].title} (ID: ${offer2.rows[0].id})`);

    const offer3 = await client.query(`
      INSERT INTO offers (
        title, description, discount_percentage, original_price,
        final_price, image_url, category_id
      ) VALUES (
        '5% OFF - Lunch Combo Deal',
        'Perfect lunch combo with your choice of main dish, side, and drink. Available Monday to Friday from 12 PM to 3 PM.',
        5,
        355.00,
        337.25,
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=400&fit=crop',
        1
      ) RETURNING id, title, discount_percentage
    `);
    console.log(`   ✅ Added: ${offer3.rows[0].title} (ID: ${offer3.rows[0].id})`);

    const offer4 = await client.query(`
      INSERT INTO offers (
        title, description, discount_percentage, original_price,
        final_price, image_url, category_id
      ) VALUES (
        '30% OFF - Dinner for Two',
        'Romantic dinner for two with a special 30% discount. Includes appetizer, two main courses, dessert, and a bottle of wine.',
        30,
        355.00,
        248.50,
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=400&fit=crop',
        2
      ) RETURNING id, title, discount_percentage
    `);
    console.log(`   ✅ Added: ${offer4.rows[0].title} (ID: ${offer4.rows[0].id})`);

    // Show summary
    console.log('\n📊 Summary:');
    const eventCount = await client.query('SELECT COUNT(*) FROM events');
    const offerCount = await client.query('SELECT COUNT(*) FROM offers');
    const categoryCount = await client.query('SELECT COUNT(*) FROM categories');

    console.log(`   Events: ${eventCount.rows[0].count} total`);
    console.log(`   Offers: ${offerCount.rows[0].count} total`);
    console.log(`   Categories: ${categoryCount.rows[0].count} total`);

    console.log('\n✅ Sample data added successfully!\n');
    console.log('📝 How to verify in pgAdmin:');
    console.log('   1. Open pgAdmin');
    console.log('   2. Navigate to: sawa_app → Schemas → public → Tables');
    console.log('   3. Right-click on "events" → View/Edit Data → All Rows');
    console.log('   4. You should see 3 events');
    console.log('   5. Right-click on "offers" → View/Edit Data → All Rows');
    console.log('   6. You should see 4 offers\n');

    console.log('🌐 Or view in browser:');
    console.log('   Events: http://localhost:3000/api/events');
    console.log('   Offers: http://localhost:3000/api/offers\n');

    client.release();
    await pool.end();

  } catch (error) {
    console.error('❌ Error adding sample data:', error.message);
    process.exit(1);
  }
}

addSampleData();
