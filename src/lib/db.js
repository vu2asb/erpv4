// db.js
import process from "process";
import { Pool } from "pg";

  export const pool = new Pool({
    user: process.env.DB_USER,          //Database user
    password: process.env.DB_PASSWORD,  // Database password
    host: process.env.DB_HOST,          // Database host
    port: process.env.DB_PORT,          // Port (default 5432)
    database: process.env.DB_NAME,      // Database name
  });
  

// Kindly refer to .env.local file
// # DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
// # DB_PORT=5432 // Use 5432 for Transaction Mode and 6543 for Connection Pooling Mode
// # DB_USER=postgres.tbkslcihgsdgoiyrglbm
// # DB_PASSWORD=JVMC1VuBwTeXat7p
// # DB_NAME=postgres
