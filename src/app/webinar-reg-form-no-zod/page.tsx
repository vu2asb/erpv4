"use client";

import { FormEvent } from "react";
import { useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("Initial");
  const [error, setError] = useState<string | null>(null);

  // Creating dummy data for the form's fields to check json payload
  // const fName = "Daisy";
  // const lName = "Rocks";
  // const email = "daisy@rocks.net";
  // const regTime = "2024-08-19T17:53:06+05:30";
  // const webinarRef = "WEB-101";
  // const webinarNote = "The first of its kind webinar, join WEB-101 now";

  //   This line of code defines an asynchronous function named onSubmit
  //   that will be called when a form is submitted. The function receives
  //   an event object as a parameter, which contains information
  //   about the form submission.
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    // populates the FormData object with the data from the form element that
    // triggered the onSubmit event. event.currentTarget refers to the form element itself.
    event.preventDefault();
    setMessage("Started");
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      // Using get() to get the first value of a specific key
      const fName = formData.get("fName");
      const lName = formData.get("lName");
      const email = formData.get("email");
      const regTime = formData.get("regTime");
      const webinarRef = formData.get("webinarRef");
      const webinarNote = formData.get("webinarNote");
      console.log(
        "Field values extracted from Formdata; First Name: " +
          fName +
          ", Last Name: " +
          lName +
          ", Email: " +
          email +
          ", Registration Time: " +
          regTime +
          ", Webinar Reference: " +
          webinarRef +
          ", Webinar Note: " +
          webinarNote +
          ""
      );

      console.log("Making an API call!");
      const response = await fetch("http://localhost:3000/api/webinar-reg-form-api", {
        method: "POST",
        body: JSON.stringify({
          fName,
          lName,
          email,
          regTime,
          webinarRef,
          webinarNote,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        // Handle Error in Form, display it to Users
        throw new Error("Invalid Form Data. Please Submit Again.");
      }
      // Handle Response if necessary
      const data = await response.json();
    } catch (error) {
      // Capture the error message to display to the user
      //setError(error.message)
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {/* This is commonly used to display error messages in a component. 
      If there's an error, the component will render a red div with 
      the error message; otherwise, it won't show anything. */}

      <form onSubmit={onSubmit} id="myForm" className="flex flex-col">
        <input type="text" name="fName" placeholder="First Name" />
        <input type="text" name="lName" placeholder="Last Name" />
        <input type="text" name="email" placeholder="Email" />
        <input
          type="text"
          name="regTime"
          value="2024-08-20T10:43:05+05:30"
          hidden
        />
        <input type="text" name="webinarRef" value="WEB-REF-101" hidden placeholder="WEB-0001" />
        <input
          type="text"
          name="webinarNote"
          value="Webinar specifc note on this webinar Reference. WEB-0001..."
          hidden
        />
        <button type="submit" className="flex justify-start">Submit</button>
      </form>
    </div>
  );
}
