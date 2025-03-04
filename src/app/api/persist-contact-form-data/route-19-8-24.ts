import { pool } from "@/lib/db";
import dbConnect from "@/lib/dbconnect";

import { NextResponse } from "next/server";
dbConnect();

// Handling POST request
export async function POST(req: any, res: any) {
  // Get the Form Data from the POST request
  const data = await req.json();
  const stringifyData = JSON.stringify(data);

  const obj = JSON.parse(stringifyData);

  console.log('Name: '+ obj.tname+ '.............');

  console.log("CL-PER-100:: POST data sent as json:: " + stringifyData + "");
  // add code here to send and save data to database

  try {
    const query =
      "INSERT INTO contact_us (name, email, client_date_time_tz, message) VALUES ('"+obj.tname+"', '"+obj.temail+"', '"+obj.tstamp+"', '"+obj.tmessage+"')";
	  
    const result = await pool.query(query);
    const re = result.rows[0];
    const t32 = JSON.stringify(result.rowCount) + ": Row(s) Added";
    console.log("Row(s) added::" + JSON.stringify(result.rowCount) + "...");

    return new Response(JSON.stringify(t32), {
      status: 200,
    });
  } catch {
    return new Response("DB error while trying to insert record", {
      status: 500,
    });
  }

}
