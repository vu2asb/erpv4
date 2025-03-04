"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const WaitingRoom = () => {
  // from registeration page:: const urlStringToPass = "/waiting-room?year="+tgtYear+"&month="+tgtMonth+"&day="+tgtDay+"&hour="+tgtHour+"&min="+tgtMin+"&sec="+tgtSec+"";
  const searchParams = useSearchParams();
  const webemail = searchParams.get("email");
  const webfname = searchParams.get("fname");
  const weblname = searchParams.get("lname");
  const webregtime = searchParams.get("regtime");
  const webRef = searchParams.get("webinarref");
  const webNote = searchParams.get("webinarnote");

  const tgtYear = searchParams.get("year");
  const tgtMonth = searchParams.get("month");
  const tgtDay = searchParams.get("day");
  const tgtHour = searchParams.get("hour");
  let tgtMin = searchParams.get("min");
  const tgtSec = searchParams.get("sec");

  const countDown =
    Number(tgtYear) * 60 * 60 * 24 * 30 * 12 +
    Number(tgtMonth) * 60 * 60 * 24 * 30 +
    Number(tgtDay) * 60 * 60 * 24 +
    Number(tgtHour) * 60 * 60 +
    Number(tgtMin) * 60 +
    Number(tgtSec);
  console.log("Waiting Room Calculated seconds: " + countDown);

  console.log(
    "Waiting Room Got: Email: " +
      webemail +
      ", F-Name: " +
      webfname +
      ", L-Name: " +
      weblname +
      ", Reg-Time: " +
      webregtime +
      ", W-Ref: " +
      webRef +
      ". W-Note: " +
      webNote +
      ", yy: " +
      tgtYear +
      ", mm: " +
      tgtMonth +
      ", dd: " +
      tgtDay +
      ", hr: " +
      tgtHour +
      ", min: " +
      tgtMin +
      ", sec: " +
      tgtSec +
      ""
  );

  // const totCountDown = tgtMin + tgtSec;
  //---------------Timer Begins-----------------------
  const totCount = Number(tgtMin) * 60; // count down in seconds
  console.log("Waiting Room Countdown Set to [Min]: " + tgtMin);
  console.log("Waiting Room Countdown Set to [sec]: " + tgtSec);

  let [count, setCount] = useState(Number(tgtMin) * 60 + Number(tgtSec)); // Timer in seconds

  useEffect(() => {
    const intervalId = setInterval(function () {
      count -= 0.5;
      if (count == 0) {
        clearInterval(intervalId);
        // console.log("Timeout :: Interval cleared.");
        console.log("Proceeding to webinar ...");
        // redirect to webinar player page
        window.location.href = "/player?email="+webemail+"&fname="+webfname+"&lname="+weblname+"&webref="+webRef+"";
      } else {
        /*console.log("useEffect for Timer function triggered; Count = " + count + ""
        );*/

        // Get the <p> element by its id and update its innerHTML when component mounts
        const countElement = document.getElementById("counter");
        if (countElement) {
          // TypeScript knows at this point countElement is not null
          // You can do something like this now -> countElement.innerHTML = `${count}`;
          let minutes = Math.floor(count / 60); // Get the whole minutes
          let seconds = count % 60; // Get the remaining seconds
          let timeDisplay = "";
          if (minutes > 0.5) {
            timeDisplay = minutes.toString() + " Min ";
          }
          if (seconds > 0.5) {
            timeDisplay += seconds.toString() + " Sec ";
          }

          countElement.innerHTML = "" + timeDisplay + "";
        } else {
          console.error('Element with id "counter" not found');
        }
      }
    }, 1000); // setInterval value in milli seconds; e.g. 1000 means 1000ms = 1 sec
  });

  //---------------Timer Ends-----------------------
  return (
    <>
      <div className="bg-cover w-full h-full bg-no-repeat bg-[url('/assets/waiting-area.jpg')]">
        <div className="mx-auto flex items-center justify-center h-screen">
          <div className="w-[82%] h-[30.2%] bg-slate-800 opacity-85 border rounded text-center sm:h-[65%] lg:h-[32vh] xl:h-[22vw] xl:w-[40vw] 2xl:h-[31vh] 2xl:w-[35%]">
            <h1 className="text-gray-50 text-[5vw] mt-[3vh]  xl:text-[2.4vw] 2xl:text-[1.5vw]">
              Welcome to the waiting room
            </h1>
            {/* <h1 className="text-gray-50 text-[5vw] mt-[3vh] sm:text-green-500 md:text-yellow-400 lg:text-blue-500 xl:text-[2.4vw] xl:text-pink-500 2xl:text-lime-400 2xl:text-[1.5vw]">
        Welcome to the waiting room
      </h1> */}
            <h1 className="text-gray-50 text-[3.8vw] mt-[3vh] lg:text-[3.2vw] xl:text-[2vw] 2xl:text-[1.4vw]">
              Kindly settle down
            </h1>
            <h1 className="text-gray-50 text-[2.5vw] mt-[4vh] mb-[1.8vh] lg:text-[2vw] lg:mt-[4vh] xl:text-[1.2vw] 2xl:text-[1vw]">
              Webinar begins in ...
            </h1>
            <span
              className="text-[4vw] text-orange-400 sm:text-[3vw] lg:text-[3vw] 2xl:text-[1.5vw]"
              id="counter"
            ></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingRoom;
