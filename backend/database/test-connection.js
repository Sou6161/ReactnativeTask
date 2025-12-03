const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sawa_app',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function testConnection() {
  console.log('\n🔍 Testing PostgreSQL Connection...\n');
  console.log('Configuration:');
  console.log(`  Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`  Port: ${process.env.DB_PORT || 5432}`);
  console.log(`  Database: ${process.env.DB_NAME || 'sawa_app'}`);
  console.log(`  User: ${process.env.DB_USER || 'postgres'}`);
  console.log(`  Password: ${process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-2) : '(empty)'}\n`);

  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ Connection successful!\n');

    // Get PostgreSQL version
    const versionResult = await client.query('SELECT version()');
    console.log('📊 PostgreSQL Version:');
    console.log(`   ${versionResult.rows[0].version.split(',')[0]}\n`);

    // Check if database exists
    const dbResult = await client.query('SELECT current_database()');
    console.log('🗄️  Current Database:');
    console.log(`   ${dbResult.rows[0].current_database}\n`);

    // List all tables
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    if (tablesResult.rows.length === 0) {
      console.log('⚠️  No tables found!');
      console.log('\n📝 Next steps:');
      console.log('   1. Open pgAdmin');
      console.log('   2. Connect to sawa_app database');
      console.log('   3. Open Query Tool (Tools → Query Tool)');
      console.log('   4. Open and run backend/database/schema.sql\n');
    } else {
      console.log('📋 Tables found:');
      tablesResult.rows.forEach(row => {
        console.log(`   ✓ ${row.table_name}`);
      });

      // Count rows in each table
      console.log('\n📊 Row counts:');
      for (const row of tablesResult.rows) {
        const countResult = await client.query(`SELECT COUNT(*) FROM ${row.table_name}`);
        console.log(`   ${row.table_name}: ${countResult.rows[0].count} rows`);
      }
      console.log('\n✅ Database is ready!');
    }

    client.release();
    await pool.end();

  } catch (error) {
    console.error('❌ Connection failed!\n');
    console.error('Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    
    if (error.message.includes('password authentication failed')) {
      console.log('   → Check DB_PASSWORD in backend/.env file');
      console.log('   → Make sure it matches your PostgreSQL password');
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.log('   → Create database "sawa_app" in pgAdmin');
      console.log('   → Right-click Databases → Create → Database');
    } else if (error.message.includes('connect ECONNREFUSED')) {
      console.log('   → Make sure PostgreSQL is running');
      console.log('   → Check if port 5432 is correct');
    } else {
      console.log('   → Check all settings in backend/.env file');
      console.log('   → Make sure PostgreSQL service is running');
    }
    console.log('');
    process.exit(1);
  }
}

testConnection();
