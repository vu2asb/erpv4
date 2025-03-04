import {pool} from "@/lib/db";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, response:NextResponse)
{
  // Check
  dbConnect()
  try{
    const query = " DELETE FROM notes;"
    const result  = await pool.query(query);
    const re = result.rows[0] ;
    const t32 = JSON.stringify(result.rowCount) + ": Row(s) Deleted";
    return new NextResponse(JSON.stringify(t32), {
          status: 200
        })
  }
  catch{
    return new NextResponse("DB ERROR ", {
      status: 500
    })

  }
  

}
