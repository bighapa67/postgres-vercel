//'use client';

import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  user: 'kenjones', // replace with your PostgreSQL username
  host: 'localhost',
  database: 'testdb', // replace with your database name
  password: '', // replace with your PostgreSQL password
  port: 5432,
});

export async function GET(req: NextRequest) {
  try {
    console.log('Fetching users...');
    const result = await pool.query('SELECT * FROM employees');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Ken: Internal Server Error' }, { status: 500 });
  }
}