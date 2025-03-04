import { pool } from "@/lib/db";
import dbConnect from "@/lib/dbconnect";
import { z, ZodError } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { log } from "console";
import moment from "moment";

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
      message: "Registration timestamp should be atleast 2 charecters",
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

export async function POST(req: NextRequest, res: NextResponse) {
  dbConnect();
  // Retrieves the incoming request body: It accesses the request object (req) and calls the formData() method on it.
  // Parses the form data: It asynchronously parses the request body as form data and returns a FormData object.
  // Assigns the parsed data to a variable: The parsed form data is stored in the data variable for further processing.
  const data = await req.formData();
  const firstName = data.get("fName");
  const lastName = data.get("lName");
  const email = data.get("email");
  const regTime = data.get("regTime");
  const webinarID = data.get("webinarRef");
  const webinarNote = data.get("webinarNote");

  const regTimeStamp = moment().format();

  // console.log('API processing!');

  console.log(
    "Name: " +
      firstName +
      " " +
      lastName +
      ", Email: " +
      email +
      ", Time: " +
      regTimeStamp +
      ", Webinar ID: " +
      webinarID +
      ", Webinar Notes: " +
      webinarNote +
      ""
  );
  //--------------------------------------------------------------------
  // zod form element name: form data element
  try {
    const applicant = userSchema.parse({
      first_name: firstName,
      last_name: lastName,
      appl_email: email,
      reg_time: regTime,
      webinar_ref: webinarID,
      webinar_note: webinarNote,
    });
    // console.log('Error: '+applicant+''); // Will throw an error due to invalid data
    // console.log('Appplicant Name: '+applicant.first_name);
    console.log("No Zod parse error");
    try {
      // Sample Eg.: SELECT * FROM webinar_reg
      const queryText =
        "INSERT INTO webinar_reg (first, last, email, reg_time, webinar_ref, webinar_note) VALUES ($1, $2, $3, $4, $5, $6)";
      const resultSet = await pool.query(queryText, [
        applicant.first_name,
        applicant.last_name,
        applicant.appl_email,
        regTimeStamp,
        applicant.webinar_ref,
        applicant.webinar_note
      ]);

      console.log(resultSet);
      const t32 = JSON.stringify(resultSet.rowCount) + ": Row(s) Added";
      return new Response(JSON.stringify(t32), {
        status: 200,
      });
    } catch {
      return new Response("Could not insert webinar reg info in db!", {
        status: 500,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("ZOD Error");
      return new Response("ZOD Error", {
        status: 500,
      });
    }
  }
}
