import { NextRequest, NextResponse } from "next/server";

// Read all rows (all the "contact us" requests recieved) of the contact_us table
export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const allContactRequests = get_contact_requests_info();
        const myJSON = JSON.stringify(allContactRequests);
        console.log(myJSON);
                
        return new NextResponse(myJSON);
    } catch (error) {
        return new NextResponse("CL: Error in fetching Contact-Us Requests via API using GET method");
    }
}

// function to read all rows (all the "contact us" requests recieved) of the contact_us table
function get_contact_requests_info() {
    let contactsInfo = [
        {
            "id": 1,
            "name": "John",
            "email": "johnd@xyz.com",
            "request_time": "2024-05-22T12:31:20+05:30",
            "message": "I wanted to know how I can get help on..."
        },
        {
            "id": 2,
            "name": "Ashok",
            "email": "ashok@xyz.com",
            "request_time": "2024-05-22T12:31:20+05:30",
            "message": "Your thoughts on..."
        }
    ]
    return contactsInfo;
}


