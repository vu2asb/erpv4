"use client";

import { Button } from "@/components/ui/button";
import TimerLP from "@/components/timer-lp";
import { CiCalendar } from "react-icons/ci";
import { useRouter } from "next/router";
import { useState, useEffect } from "react"; // we will need this to mantain the loading state

// NOTE:
// Set the webinar reference and webinar note that
// will be sent to the webinar registration form as URP params
// E.g.
// const webinar_ref = "Web Ref-101";
// const webinar_note = "Note for Web Ref-101";
const webinar_ref = "Web Ref-101";
const webinar_note = "Note for Web Ref-101";

// Set the duration of the counter here in minutes e.g. 10
// E.g.
// const freqMins = 10; // Minuites
const freqMins = 1;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const separator = "   "; // Adjust the number of spaces as needed

const LandingPage2 = () => {
  const nowTime = new Date().getTime();
  const now = new Date(nowTime);
  console.log("LP Present Time:: " + now);

  // Set Now Time :: Get day, hour, and second from the Date object
  const nyear = now.getFullYear();
  const nmonth = now.getMonth() + 1;
  const nday = now.getDate();
  let nhour = now.getHours();
  const nmin = now.getMinutes();
  const nseconds = now.getSeconds();
  // Show Now Time
  console.log("Present Year:", nyear);
  console.log("Present Month:", nmonth);
  console.log("Present Day:", nday);
  nhour >= 12?(nhour-12): nhour;
  // if (nhour >= 12) {
  //   nhour -= 12;
  // }
  console.log("Present Hour:", nhour);
  console.log("Present Min:", nmin);
  console.log("Present Sec:", nseconds);

  // Set Target Time by adding latency; value held by variable 'freqMins' above in minutes to the current time
  now.setMinutes(now.getMinutes() + freqMins);
  let Ttime = now;
  let tYear = now.getFullYear();
  let tMonth = now.getMonth() + 1;
  let tDay = now.getDate();
  let tHour = now.getHours();
  let tMin = now.getMinutes();
  let tSec = now.getSeconds();

  let ampm = "";
  if (tHour >= 13) {
    ampm = "PM";
    tHour = tHour - 12;
  } else {
    ampm = "AM";
  }

  // const difference = freqMins;

  const monthIndex = tMonth;
  const monthName = monthNames[monthIndex - 1];
  // Modify the month (months are zero-indexed in JavaScript, so 0 is January and 11 is December)
  // console.log(monthName); // Output: "September"

  const suffixes = ["th", "st", "nd", "rd", "th"];
  // tDay = 20;
  const dayIndex = tDay % 10;
  const daySuffix =
    suffixes[
      dayIndex >= 4 || dayIndex === 0 || (tDay >= 11 && tDay <= 13)
        ? 0
        : dayIndex
    ];

  // const currentDateTime = new Date();
  // console.log("LP Present Date & Time: " + currentDateTime.toString());
  // const targetTime = mynow.setMinutes(mynow.getMinutes() + freqMins); // The counter loading time is set here

  console.log("Target Year:" + tYear + "");
  console.log("Target Month:" + tMonth + "");
  console.log("Target Day:" + tDay + "");
  console.log("Target Hour:" + tHour + "");
  console.log("Target Min:" + tMin + "");
  console.log("Target Sec:" + tSec + "");

  const isoDateString = now.toISOString();
  // console.log("LP Target Time:: " + mynow);
  // const ttime = mynow.toISOString();
  // console.log("LP Target Time ISO String:: " + mynow);

  const dYear = tYear - nyear;
  const dMonth = tMonth - nmonth;
  const dDay = tDay - nday;

if(nhour >= 12){
  nhour -=12;
}
 
const dHour = tHour - nhour;



  const dMin = tMin - nmin;
  const dSec = tSec - nseconds;
  console.log(
    "Difference YY: " +
      dYear +
      ", MNT " +
      dMonth +
      ", DD: " +
      dDay +
      ", HH: " +
      dHour +
      ", Min: " +
      dMin +
      ", SS: " +
      dSec +
      ""
  );

  let [timeLeft, settimeLeft] = useState(freqMins * 60); // Timer set for webinar repeat

  let goLiveMinute = 0;
  let goLiveSecond = 0;

  useEffect(() => {
    const intervalId = setInterval(function () {
      timeLeft--;
      //   console.log("useEffect for Timer function triggered; Count = " + count + "");
      if (timeLeft < 0) {
        clearInterval(intervalId);
        console.log("Go-Live");
      } else {
        // Calculating time to go Live
        goLiveMinute = Math.floor((timeLeft / 60) % 60);
        goLiveSecond = Math.floor(timeLeft % 60);

        console.log(
          "Time set to Go-Live: " +
            freqMins +
            " Mins & " +
            ((freqMins * 60) % 60) +
            " Secs"
        );
        console.log(
          "Time left to Go-Live: " +
            goLiveMinute +
            " Mins & " +
            goLiveSecond +
            " Secs"
        );
      }
    }, 1000); // setInterval value in milli seconds; e.g. 1000 means 1000ms = 1 sec
  });

  return (
    <main className="container mx-auto h-screen flex justify-center items-center">
      <div className="px-4 w-full flex flex-col justify-center items-center">
        <section className="my-10 pt-10">
          <h1 className="text-2xl">The upper part of the landing page.</h1>

          <div className="flex justify-center place-items-center mt-10">
            <Button
              onClick={() => {
                console.log("Button Clicked ...");
                const url =
                  "http://localhost:3000/webinar-reg-form-with-schad-zod?wref=" +
                  webinar_ref +
                  "&wnote=" +
                  webinar_note +
                  "&targetYear=" +
                  dYear +
                  "&targetMonth=" +
                  dMonth +
                  "&targetDay=" +
                  dDay +
                  "&targetHour=" +
                  dHour +
                  "&targetMin=" +
                  goLiveMinute +
                  "&targetSec=" +
                  goLiveSecond;
                window.location.href = url;
              }}
              className="text-xl"
            >
              SECURE MY SEAT
            </Button>
          </div>
        </section>

        <section className="m-10 p-5 flex flex-row">
          <div>
            <CiCalendar size={100} className="text-[#c9b7a3]" />
          </div>
          <div className="flex flex-col justify-items-center items-center my-auto mr-20 ml-20">
            <span className="text-[#c9b7a3] text-[20px] mb-1">
              Webinar Begins
            </span>
            <span className="text-[#c9b7a3] text-[15px]">
              {/* {monthName},{tDay}th,{tYear} */}
              {monthName}, {separator}
              {tDay}
              {daySuffix},{separator}
              {tYear}
              {/* September, 15th, 2024 */}
            </span>
            <span className="text-[#c9b7a3] text-[28px]">
              {/* {tHour}:{(tMin < 10) ? `${tMin.toFixed(2)}`: tMin} {ampm} */}
              {tHour}:{tMin < 10 ? `0${tMin}` : tMin} {ampm}
            </span>
          </div>

          <div className="flex flex-col place-content-center">
            <div className="text-[#c9b7a3] text-center text-2xl">
              Doors close in
            </div>
            <div>
              <TimerLP launchDate={isoDateString} />
              {/* 2024: Year
            10: Month
            15: Day
            T: Separator between date and time
            17: Hour (in 24-hour format)
            00: Minute
            00: Second */}
            </div>
          </div>
        </section>
        <section className="m-20 p-20">
          <h1 className="text-2xl">The lower part of the landing page.</h1>
        </section>
      </div>
    </main>
  );
};

export default LandingPage2;
