"use client";

import { Button } from "@/components/ui/button";

const webinar_ref = "Web Ref-101";
const webinar_note = "Note for Web Ref-101";

const LandingPage1 = () => {
  return (
    <div>
      Lp-1
      <Button
        onClick={() => {
          console.log("Button Clicked ...");
          const url = "http://localhost:3000/webinar-reg-form-with-schad-zod?wref="+webinar_ref+"&wnote="+webinar_note+"";
          window.location.href = url;  
        }}
      >
        Click me
      </Button>
    </div>
  );
};

export default LandingPage1;
