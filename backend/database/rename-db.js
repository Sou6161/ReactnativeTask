const { Client } = require('pg');
require('dotenv').config();

async function renameDatabase() {
  console.log('\n🔄 Renaming Database: nightlife_hub → sawa_app\n');

  // Connect to postgres database (not nightlife_hub)
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres', // Connect to default postgres database
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL\n');

    // Step 1: Terminate connections to nightlife_hub
    console.log('📌 Step 1: Disconnecting users from nightlife_hub...');
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = 'nightlife_hub'
        AND pid <> pg_backend_pid()
    `);
    console.log('   ✅ All users disconnected\n');

    // Step 2: Rename database
    console.log('📌 Step 2: Renaming database...');
    await client.query('ALTER DATABASE nightlife_hub RENAME TO sawa_app');
    console.log('   ✅ Database renamed to sawa_app\n');

    // Step 3: Verify
    console.log('📌 Step 3: Verifying...');
    const result = await client.query(
      "SELECT datname FROM pg_database WHERE datname = 'sawa_app'"
    );
    
    if (result.rows.length > 0) {
      console.log('   ✅ Verified: sawa_app exists\n');
    }

    console.log('🎉 Database renamed successfully!\n');
    console.log('📝 Next steps:');
    console.log('   1. Restart backend: npm run dev');
    console.log('   2. Test connection: npm run test:db');
    console.log('   3. Refresh pgAdmin to see the new name\n');

    await client.end();

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('does not exist')) {
      console.log('\n💡 The database might already be renamed!');
      console.log('   Check pgAdmin or run: npm run test:db\n');
    } else if (error.message.includes('being accessed')) {
      console.log('\n💡 Database is in use. Try:');
      console.log('   1. Stop the backend server');
      console.log('   2. Close all pgAdmin Query Tools');
      console.log('   3. Run this script again\n');
    } else {
      console.log('\n💡 Make sure:');
      console.log('   1. PostgreSQL is running');
      console.log('   2. Password in .env is correct');
      console.log('   3. Database nightlife_hub exists\n');
    }
    
    process.exit(1);
  }
}

renameDatabase();
