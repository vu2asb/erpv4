// Building Under Construction Page with Countdown Timer | React + Next.js 14 + TailwindCSS | Geekboots
// https://www.youtube.com/watch?v=2dz81rb29eo&t=626s

"use client";

import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";

interface TimeCount {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// let dd = 0; let hh = 0; let mm = 0; let ss = 0;
const nowTime = new Date().getTime();

// console.log("Present Time is: " + nowTime + ""); // Output: 1694097460000 (example value)
console.log("Present Time is: " + (nowTime + 10 * 60 * 1000) + ""); // Output: 1694097460000 (example value)
const tenMinutesLater = nowTime + 10 * 60 * 1000; // 10 minutes in milliseconds
console.log("Time 10 minutes later:: " + new Date(tenMinutesLater) + "");

const getTimeLeft = (expiry: string): TimeCount => {
  let days = "0";
  let hours = "0";
  let minutes = "0";
  let seconds = "0";

  const difference = new Date(expiry).getTime() - new Date().getTime();
  if (difference <= 0) {
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  const dys = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const mnt = Math.floor((difference / (1000 * 60)) % 60);
  const snd = Math.floor((difference / 1000) % 60);

  // let dd = 0; let hh = 0; let mm = 0; let ss = 0;
  if (dys == 0 && hrs == 0 && mnt == 0 && snd == 0) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "Session Timed Out",
      showConfirmButton: true,
      timer: 10000,
    });

    // Replace 10000 with the desired delay in milliseconds
    setTimeout(() => {
      window.location.reload();
    }, 10000);
  }

  days = dys < 10 ? `0${dys}` : dys.toString();
  hours = hrs < 10 ? `0${hrs}` : hrs.toString();
  minutes = mnt < 10 ? `0${mnt}` : mnt.toString();
  seconds = snd < 10 ? `0${snd}` : snd.toString();

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const TimerLP = ({ launchDate }: { launchDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeCount>(getTimeLeft(launchDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(launchDate));
    }, 1000);
  }, [launchDate]);

  return (
    <div>
      <div className="flex flex-row">
        <span className="flex flex-col justify-center items-center bg-secondary text-primary text-4xl rounded-1xl  m-1 pt-2 px-4 w-[94px]">
          {timeLeft.days}
          <small className="text-[12px] uppercase font-semibold text-primary">
            Days
          </small>
        </span>
        <span className="flex flex-col justify-center items-center bg-secondary text-primary text-4xl rounded-1xl m-1 pt-2 px-4 w-[94px]">
          {timeLeft.hours}
          <small className="text-[12px] uppercase font-semibold text-primary">
            Hours
          </small>
        </span>
        <span className="flex flex-col justify-center items-center bg-secondary text-primary text-4xl rounded-1xl m-1 pt-2 px-4 w-[94px]">
          {timeLeft.minutes}
          <small className="text-[12px] uppercase font-semibold text-primary">
            Minutes
          </small>
        </span>
        <span className="flex flex-col justify-center items-center bg-secondary text-primary text-4xl rounded-1xl m-1 pt-2 px-4 w-[94px]">
          {timeLeft.seconds}
          <small className="text-[12px] uppercase font-semibold text-primary">
            Seconds
          </small>
        </span>
      </div>
    </div>
  );
};

export default TimerLP;
