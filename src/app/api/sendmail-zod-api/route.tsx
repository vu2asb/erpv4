// Use this api to send mail to only single to, cc and bcc recepients
// using comma seperated addresses.
// --------------------------------------------------------------------------
// Place the following lines in .env.local folder
// NEXT_PUBLIC_EMAIL_USERNAME = admin@auralsystems.com
// NEXT_PUBLIC_EMAIL_PASSWORD = 26-Jan-1947
// NEXT_PUBLIC_PERSONAL_EMAIL = ashokkumarsingh@gmail.com
//----------------------------------------------------------------------------
// Field descriptions from https://nodemailer.com/message/
// from: The email address of the sender. All email addresses can be
// plain ‘sender@server.com’ or formatted '“Sender Name” sender@server.com
// to: recipients email addresses that will appear on the "To:"" field.
// cc: recipients email addresses that will appear on the "Cc:"" field
// bcc: recipients email addresses that will appear on the "Bcc:" field
// subject: Text of the subject of the email
// text: The plaintext version of the message as an Unicode string, Buffer,
// Stream or an attachment-like object ({path: ‘/var/data/…'})
// html: The HTML version of the message as an Unicode string, Buffer, Stream
// or an attachment-like object ({path: ‘http://…'})
// attachments - An array of attachment objects

import { z, ZodError } from "zod";
import { NextResponse, NextRequest } from "next/server";

const userSchema = z.object({
  s_name: z
    .string()
    .trim()
    .min(2, "First Name must be at least 2 characters long"),
  s_email: z.string().trim().email({ message: "Invalid email address" }),
  s_subject: z
    .string()
    .trim()
    .min(2, { message: "Must be 2 or more characters long" }),
  s_message: z
    .string()
    .trim()
    .min(2, { message: "Must be 2 or more characters long" }),
  s_ccemail: z.string().trim().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  s_bccemail: z.string().trim().email({ message: "Invalid email address" }).optional().or(z.literal("")),
});

// Handles POST requests to /api
export async function POST(request: Request, response: Response) {
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
 
  try {
    const formData = await request.formData();
    const fdname = formData.get("name");
    const fdemail = formData.get("email");
    const fdsubject = formData.get("subject");
    const fdmessage = formData.get("message");
    const fdccemail = formData.get("ccemail");
    const fdbccemail = formData.get("bccemail");

    console.log(
      "Form Data Elements - Name: " +
        fdname +
        ", Email: " +
        fdemail +
        ", Subject: " +
        fdsubject +
        ", Message: " +
        fdmessage +
        ", CC: " +
        fdccemail +
        ", BCC: " +
        fdbccemail +
        ""
    );
    const result = userSchema.safeParse({
      s_name: fdname,
      s_email: fdemail,
      s_subject: fdsubject,
      s_message: fdmessage,
      s_ccemail: fdccemail,
      s_bccemail: fdbccemail,
    });
    if (!result.success) {
      // error condition
      console.log("Zod parse failed. Response code: 501");
      return new NextResponse("API call failed.", {
        status: 501,
      });
    }
    if (result.success) {
      // No error condition
      console.log("Zod parse success. Response code: 200");
      return new NextResponse("API call passed.", {
        status: 200,
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    console.log("Zod parse error. Response code: 500");
    return new NextResponse("API call failed", {
      status: 500,
    });
  }
}
