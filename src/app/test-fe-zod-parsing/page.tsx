"use client";

import { useState } from 'react';
import { z, ZodError } from "zod";

const formSchema = z.object({	
  Name: z.string().trim().min(2, { message: "Must be 2 or more characters long" }),
  Email: z.string().trim().email({ message: "Invalid email address" }),
  Subject: z.string().trim().min(2, { message: "Must be 2 or more characters long" }),
  Message: z.string().trim().min(2, { message: "Must be 2 or more characters long" }),
  Ccemail: z.string().trim().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  Bccemail: z.string().trim().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  });
   
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    ccemail: '',
    bccemail: '',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Extract form data elements to JavaScript variables
    const name = formData.name;
    const email = formData.email;
    const subject = formData.subject;
    const message = formData.message;
    const ccemail = formData.ccemail;
    const bccemail = formData.bccemail;

    // Display the values of the JavaScript variables
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('CC Email:', ccemail);
    console.log('BCC Email:', bccemail);

    const result = formSchema.safeParse({
      Name: name,
      Email: email,
      Subject: subject,
      Message: message,
      Ccemail: ccemail,
      Bccemail: bccemail
    });
    if (result.success){
      alert("Parse success!");
    }
    else{
      alert("Parse failure!"+result.error);
      const errors = result.error.issues;
      let errorMessage = "";
      errors.forEach((error) => {
        errorMessage += `${error.path[0]}: ${error.message}\n`;
      });
      alert(errorMessage);
    }


  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Abhinav Singh"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        name="email"
        placeholder="Valid email address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        name="subject"
        placeholder="Valid subject text"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
      />
      <input
        type="text"
        name="message"
        placeholder="Valid message text"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <input
        type="text"
        name="ccemail"
        placeholder="Valid email address"
        value={formData.ccemail}
        onChange={(e) => setFormData({ ...formData, ccemail: e.target.value })}
      />
      <input
        type="text"
        name="bccemail"
        placeholder="Valid email address"
        value={formData.bccemail}
        onChange={(e) => setFormData({ ...formData, bccemail: e.target.value })}
      />
      <button className="text-xl text-white border-2 border-black bg-blue-500">
        Submit to Check
      </button>
    </form>
  );
}

export default ContactForm;