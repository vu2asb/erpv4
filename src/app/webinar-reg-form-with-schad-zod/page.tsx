"use client";

import moment from "moment";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import SpinnerPulse from "@/components/ui/spinnerPulse"; // import the spinner component
import React, { useState, useEffect } from "react"; // we will need this to mantain the loading state
import { useRouter } from 'next/router';

const formSchema = z.object({
  sfName: z
    .string()
    .trim()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(60, { message: "Must not be 60 or more characters long" }),
  slName: z
    .string()
    .trim()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(60, { message: "Must not be 60 or more characters long" }),
  semail: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .min(2, { message: "Must be 2 or more characters long" })
    .max(60, { message: "Must not be 60 or more characters long" }),
  stimeStamp: z.string().optional(),
  swebinarRef: z.string().trim().optional(),
  swebinarNote: z.string().trim().optional(),
});

// Entry >>>>
export default function WebRegister() {
  let [users, setUsers] = useState([null]);
  let [loading, setLoading] = useState(false);

  const wait = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  //----------------------Timeout Timer Begins------------------------
  let [count, setCount] = useState(60); // Timer set for 60 seconds

  useEffect(() => {
    const intervalId = setInterval(function () {
      count--;
      //   console.log("useEffect for Timer function triggered; Count = " + count + "");
      if (count == 0) {
        clearInterval(intervalId);
        console.log("Timeout :: Interval cleared.");
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Session Timed Out",
          html: `
          <h3 style="font-size: 1.1em; margin-bottom: 8px;">We're currently experiencing a system outage.</h3>
          <h4 style="font-size: 0.9em; margin-bottom: 6px;">You shall be redirected</h4>
          <h5 style="font-size: 0.9em; margin-bottom: 8px;">Thank you for your patience.</h5>
          <h6 style="font-size: 0.8em; margin-bottom: 5px; color: green;">[MA-100]</h6>
            `,
          showConfirmButton: true,
          timer: 10000,
        });
        // Replace 5000 with the desired delay in milliseconds
        setTimeout(() => {
          window.location.href = "/landings/lp-2";
        }, 5000);
      } else {
        // console.log("Counting");
      }
    }, 1000); // setInterval value in milli seconds; e.g. 1000 means 1000ms = 1 sec
  });

  //-------------------------------Timeout Timer Ends------------------------------
  const searchParams = useSearchParams();
  const webRef = searchParams.get("wref");
  const webNote = searchParams.get("wnote");
  const tgtYear = searchParams.get("targetYear");
  const tgtMonth = searchParams.get("targetMonth");
  const tgtDay = searchParams.get("targetDay");
  const tgtHour = searchParams.get("targetHour");
  const tgtMin = searchParams.get("targetMin");
  const tgtSec = searchParams.get("targetSec");
  console.log("Reg Form Got:  yy: "+tgtYear+", mm: "+tgtMonth+", dd: "+tgtDay+", hr: "+tgtHour+", min: "+tgtMin+", sec: "+tgtSec+"");


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sfName: "",
      slName: "",
      semail: "",
      stimeStamp: "",
      swebinarRef: "",
      swebinarNote: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // console.log("Submit button clicked ...!");

    values.stimeStamp = moment().format();
    // console.log({ values });
    values.swebinarRef = "W-101 Default Reference ...";
    values.swebinarNote = "W-101 Default Note ...";

    var fName = values.sfName;
    var lName = values.slName;
    var email = values.semail;
    var regTime = values.stimeStamp;
    var webinarRef = webRef;
    var webinarNote = webNote;

    const fetchData = async () => {
      setLoading(true); // Set loading to true to start showing the spinner
      const response = await fetch(
        "http://localhost:3000/api/webinar-reg-form-api",
        {
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
        }
      );
      const data = await response.json();
      if (response.status != 200) {
        // console.log("New Func:: API call failed");
        // alert("New Func:: API call failed");
        // console.log("Response status is not 200");
        Swal.fire({
          title: "Oops...",
          imageUrl: "https://unsplash.it/450/250",
          imageWidth: 450,
          imageHeight: 250,
          imageAlt: "Custom image",
          html: `
          <h3 style="font-size: 1.5em; margin-bottom: 8px;">Sorry!</h3>
          <h4 style="font-size: 1.3em; margin-bottom: 6px;">Could not process your request</h4>
          <h5 style="font-size: 1em; margin-bottom: 8px;">Please try after some time</h5>
          <h6 style="font-size: 0.8em; margin-bottom: 5px; color: green;">[MA-001]</h6>
            `,
          footer:
            '<a style="color: blue;" href="#">Why do I have this issue?</a>',
          confirmButtonText: "Continue",
        });
        //---------swal ends----------
        // Need to reload the page now
        await wait(10000);
        window.location.reload();
        // window.location.reload(); // use this for instant reload
        return;
      }
      if (response.status == 200) {
        // console.log("New Func:: API call success");
        // alert("New Func:: API call success");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Done!",
          showConfirmButton: false,
        });
        // Need to redirect the page to the waiting room now
        await wait(3000);
        // window.location.reload();
        // return;
        // Replace 3000 with the desired delay in milliseconds
        /* regTime = "20-9-24 1:01 PM"; */
        console.log("Reg-Form:: Reg Time = "+regTime);
        setTimeout(() => {
          const urlStringToPass = "/waiting-room?email="+email+"&fname="+fName+"&lname="+lName+"&regtime="+regTime+"&webinarref="+webinarRef+"&webinarnote="+webinarNote+"&year="+tgtYear+"&month="+tgtMonth+"&day="+tgtDay+"&hour="+tgtHour+"&min="+tgtMin+"&sec="+tgtSec+"";
          window.location.href = urlStringToPass;
        }, 3000);
        return;
      }
    };
    setLoading(false); // Set loading to false to stop showing the spinner
    fetchData()
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        // console.log("New Func:: API call error");
        // console.error(err);
        // alert("API fetch catch block error");

        Swal.fire({
          title: "Oops...",
          imageUrl: "https://unsplash.it/450/250",
          imageWidth: 450,
          imageHeight: 250,
          imageAlt: "Custom image",
          html: `
            <h3 style="font-size: 1.5em; margin-bottom: 8px;">Sorry!</h3>
            <h4 style="font-size: 1.3em; margin-bottom: 6px;">Could not process your request</h4>
            <h5 style="font-size: 1em; margin-bottom: 8px;">Please try after some time</h5>
            <h6 style="font-size: 0.8em; margin-bottom: 5px; color: green;">[MA-002]</h6>
              `,
          footer:
            '<a style="color: blue;" href="#">Why do I have this issue?</a>',
          confirmButtonText: "Continue",
        });
        //---------swal ends----------

        // Need to reload the page now
        // Replace 2000 with the desired delay in milliseconds
        setTimeout(() => {
          window.location.reload();
        }, 10000);
        // window.location.reload(); // use this for instant reload
      });
  };

  return (
    <div className="mx-auto min-h-svh flex items-center justify-center">
      <div className="border border-slate-700 w-[60%] flex flex-col items-center justify-center lg:flex-row">
        {/* Left side div*/}
        <div className="m-0 border border-slate-700 w-[100%] relative bg-cover bg-center lg:w-[65%]">
          <Image
            src="/assets/webinar-reg-small.jpg"
            alt="Picture for the Webinar registeration form"
            width={900}
            height={600}
            layout="responsive"
            objectFit="cover" // or 'cover' depending on your needs
            className="sm:min-h-full"
          />
          {/* <h1 className="absolute top-10 left-10 text-white text-xl font-bold">
            Webinar Registeration Form
          </h1> */}
          {/* <div className="flex flex-col absolute top-[10px] left-[10px] text-slate-800 text-xl">
            <div className="text-2xl sm:text-3xl font-bold md:text-[16px]/[2]">
              Level-up your game{" "}
            </div>
            <div className="text-[18px] sm:text-1.5xl md:text-[12px]/[1.5] lg:text-[14px]/[1.5]">
              <div>Learn valuable insights and gain a competitive edge</div>
              <div>Don't miss out - register "Now!"</div>
            </div>
          </div> */}
        </div>

        {/* Right side div */}
        <div className="w-[100%] p-5 lg:w-[35%] m-10 lg:m-0">
          <div className="flex justify-center items-center mt-0 pt-0 py-0 lg:mb-10">
            <Image
              src="../assets/NewLogo.svg"
              alt="Logo image"
              // className="dark:invert"
              width={100}
              height={100}
              priority
            />
          </div>
          <div className="">
            <Form {...form}>
              <h1 className="my-2 text-2xl text-primary flex justify-center">
                Register NOW!
              </h1>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-[100%] flex flex-col justify-center py-2"
              >
                <FormField
                  control={form.control}
                  name="sfName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-slate-100 text-slate-900 text-0.5xl"
                            placeholder="Andrew"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="slName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-slate-100 text-slate-900 text-0.5xl"
                            placeholder="Sharma"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="semail"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-slate-100 text-slate-900 text-0.5xl"
                            placeholder="Email Address"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button className="mt-6" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          {/* Check whether API is loading */}
          {loading && (
            <div className="bg-slate-700 rounded p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <SpinnerPulse />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
