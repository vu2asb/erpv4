"use client";

import SpinnerPulse from "@/components/ui/spinnerPulse";

const Loading = () => {
  return (
    <div>
        <div className="bg-slate-700 rounded p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <SpinnerPulse />
        </div>
    </div>
  );
};
export default Loading;
