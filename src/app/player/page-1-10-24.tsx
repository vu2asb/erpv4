"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

const Player = () => {
  // from waiting room:: window.location.href = "/player?email="+webemail+"&fname="+webfname+"&lname="+weblname+"&webref="+webRef+"";
  const searchParams = useSearchParams();
  const INemail = searchParams.get("email");
  const INwebfname = searchParams.get("fname");
  const INweblname = searchParams.get("lname");
  const INwebref = searchParams.get("webref");
  console.log(
    "Player: Email: " +
      INemail +
      ", F-Name: " +
      INwebfname +
      ", L-Name: " +
      INweblname +
      ", Webinar Ref: " +
      INwebref +
      ""
  );

  return <div>Player</div>;
};

export default Player;
