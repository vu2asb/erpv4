import { NextRequest, NextResponse } from "next/server";

async function getContacts() {
  const response = await fetch('http://localhost:3000/api/view-contact-requests', {
    cache: 'no-cache',
  });
  if (!response) {
    throw new Error('Error fetching contact-us info; details/status:: ' + response.statusText)
  }
  const data = await response.json();
  return data;
}

export default async function Contacts() {
  const contacts = await getContacts();
  console.log(contacts);
  return (
    <div className="text-center mt-10">
      <h1 className=" text-4xl">
        History of Contact Us requests
      </h1>
      <h1 className=" text-2xl mt-5 mb-10">
        In reverse chronological order [latest first]
      </h1>

      <div className="flex justify-center items-center text-[1.1rem]">
        <table className="border-collapse border-spacing-4 border border-slate-800">
          <tbody>
            <tr>
              <th className="border border-slate-300 mx-10 px-5">Sr.No</th>
              <th className="border border-slate-300 mx-10 px-10">Name</th>
              <th className="border border-slate-300 mx-10 px-10">Email</th>
              <th className="border border-slate-300 mx-10 px-10">Request Time</th>
              <th className="border border-slate-300 mx-10 px-10">Message</th>
            </tr>

            {contacts.map(contacts => {
              return (
                <>
                  <tr key={contacts.id}>
                    <td className="border border-slate-300"> {contacts.id}</td>
                    <td className="border border-slate-300">{contacts.name}</td>
                    <td className="border border-slate-300">{contacts.email}</td>
                    <td className="border border-slate-300">{contacts.request_time}</td>
                    <td className="border border-slate-300 text-left">{contacts.message}</td>
                  </tr>
                </>
              )
            })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}




