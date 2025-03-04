/* 
String for API testing: {"fName":"John", "lName":"Doe", "email":"john.doe@gmail.com", 
"regTime": "2024-08-19T12:41:10+05:30", "webinarRef": "Webinar ID: 101", "webinarNote": "The webinar note"}
*/

import { pool } from "@/lib/db";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { log } from "console";
import moment from "moment";

dbConnect();

// Creating our validation schema
const userSchema = z.object({
  first_name: z
    .string({ required_error: "First Name is required" })
    .trim()
    .min(2, { message: "First Name should be atleast 2 charecters" })
    .max(30, { message: "First Name should not be longer than 30 charecters" }),
  last_name: z
    .string({ required_error: "Last Name is required" })
    .trim()
    .min(2, { message: "Last Name should be atleast 2 charecters" })
    .max(30, { message: "Last Name should not be longer than 30 charecters" }),
  appl_email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email format")
    .min(4, { message: "Email should be atleast 4 charecters" })
    .max(30, { message: "Email should not be longer than 30 charecters" }),
  reg_time: z
    .string({
      required_error: "Registration timestamp with time zone is required",
    })
    .trim()
    .min(20, {
      message: "Registration timestamp should be atleast 20 charecters",
    })
    .max(30, {
      message: "Registration timestamp should not be longer than 30 charecters",
    }),
  webinar_ref: z
    .string({ required_error: "Webinar reference is required" })
    .trim()
    .min(1, { message: "Webinar reference should be atleast 1 charecter" })
    .max(20, {
      message: "Webinar reference should not be longer than 20 charecters",
    }),
  webinar_note: z
    .string({ required_error: "Webinar note text is required" })
    .trim()
    .min(1, { message: "Webinar note text should be atleast 1 charecter" })
    .max(200, {
      message: "Webinar note text should not be longer than 200 charecters",
    }),
});

export async function GET() {
  return new Response("GET Success", {
    status: 200,
  });
}

// Handling POST request
export async function POST(req: NextRequest, res: NextResponse) {
  // Get the json data recieved with the POST request
  const data = await req.json();
  const stringifyData = JSON.stringify(data);
  const obj = JSON.parse(stringifyData);
  const regTimeStamp = moment().format();

  console.log(
    "First Name: " +
      obj.fName +
      ", Last Name: " +
      obj.lName +
      ", email: " +
      obj.email +
      ", Registeration Timestamp: " +
      regTimeStamp +
      ", Webinar Reference: " +
      obj.webinarRef +
      "Weninar Notes: " +
      obj.webinarNote +
      ""
  );

  console.log(
    "JSON payload sent from the registeration form to API:: " +
      stringifyData +
      ""
  );
  // add code here to send and save data to database

  try {
    const applicant = userSchema.parse({
      first_name: obj.fName,
      last_name: obj.lName,
      appl_email: obj.email,
      reg_time: obj.regTime,
      webinar_ref: obj.webinarRef,
      webinar_note: obj.webinarNote,
    });
    console.log("Looks like no Zod parse error");
    try {
      // "INSERT INTO contact_us (name, email, client_date_time_tz, message) VALUES ('"+obj.tname+"', '"+obj.temail+"', '"+obj.tstamp+"', '"+obj.tmessage+"')";
      const queryText =
        "INSERT INTO webinar_reg (first, last, email, reg_time, webinar_ref, webinar_note) VALUES ($1, $2, $3, $4, $5, $6)";

      const result = await pool.query(queryText, [
        applicant.first_name,
        applicant.last_name,
        applicant.appl_email,
        regTimeStamp,
        applicant.webinar_ref,
        applicant.webinar_note,
      ]);

      // const result = await pool.query(query);
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("ZOD Error :" + error + "");
      return new Response("ZOD Error", {
        status: 500,
      });
    }
  }
}
