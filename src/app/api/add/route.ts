import {pool} from "@/lib/db";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest)
{
  // Check
  dbConnect()

  try{
    const query = "INSERT into notes (title) values('Quick Brown Fox')" ;
    const result = await pool.query(query);
    const re = result.rows[0] ;
    const t32 = JSON.stringify(result.rowCount) + ": Row(s) Added";
    return new Response(JSON.stringify(t32), {
          status: 200
        })
  }
  catch{
    return new Response("DB ERROR WHILE ADDING", {
      status: 500
      }) ;
  }
  
}