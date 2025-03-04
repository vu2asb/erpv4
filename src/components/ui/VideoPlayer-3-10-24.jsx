"use client";

import React from "react";
import { useRef, useEffect } from "react";
import videojs from "video.js";
import Hls from "hls.js";
import "video.js/dist/video-js.css";
import { Volume1 } from "lucide-react";

console.log("Player Component Called ...");
let pRef = null;
let vRef = null;
let videoDuration = 0;
let isMuted = true;

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  // Log browser details only if in browser context
  const logBrowserDetails = () => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent;

      console.log("Browser Details:");
      console.log("User Agent:", userAgent);

      // Optionally parse the userAgent for specific information (optional)
      const browserInfo = {
        isChrome: /Chrome/.test(userAgent),
        isFirefox: /Firefox/.test(userAgent),
        isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
        isEdge: /Edg/.test(userAgent),
        isIE: /MSIE|Trident/.test(userAgent),
      };

      console.log("Parsed Browser Info:", browserInfo);
    }
  };

  useEffect(() => {
    logBrowserDetails();  // Log browser details when the component is mounted
    playerRef.current = videojs(videoRef.current, {
      controls: false,
      muted: false,
      autoplay: true,
      preload: "auto",
      Volume1,
    });
    pRef = playerRef.current;

    if (Hls.isSupported()) {
      console.log("HLS supported");

      const hls = new Hls();
      hls.config.maxBufferSize = 10 * 1024 * 1024;
      console.log("New object of HLS created");
      hls.loadSource(src);
      console.log("HLS stream loaded");
      hls.attachMedia(videoRef.current);
      console.log("Media attached");

      vRef = videoRef.current;
      videoDuration = vRef.duration;
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Manifest parsing Okay!");
        console.log("Playing current reference");
        videoRef.current.muted = true;
        vRef.play();
        vRef.volume = 1;
        console.log("Volume: " + vRef.volume);

        // Listen for the metadata loaded event
        var player = videojs(playerRef);
        player.on("loadedmetadata", function () {
          var Duration = player.duration(); // Get the duration in seconds
          console.log("Video duration:", Duration, "seconds");
        });
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("The native video player can handle HLS");
      videoRef.current.src = src;
      videoRef.current.addEventListener("canplay", () => {
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    } else {
      console.log("Video format not supported");
    }
  }, [src]);

  useEffect(() => {
    let MuteToggle = null;
    let topMsg = null;

    // Only access document if we are in the browser environment
    if (typeof document !== "undefined") {
      MuteToggle = document.getElementById("btn");
      topMsg = document.getElementById("topMmessage");
    }

    // You can add event listeners or other logic using these elements if necessary
  }, []);

  let tCount = 0;
  const myInterval = setInterval(function () {
    tCount++;
    // console.log("Timer:: Elapsed Time (Sec): " + tCount);
    // console.log("Timer: Duration (Secs): " + vRef.duration);
    // console.log("Timer:: Current Time (Sec): " + vRef.currentTime);
    const percentViewed = Math.trunc((vRef.currentTime * 100) / vRef.duration);
    console.log("%age complete: " + percentViewed + " %");

    if (vRef.ended) {
      console.log("Timer:: Video Ended");
      clearInterval(myInterval);
    }

    // Persistence handling goes here ...
  }, 1000);

  const handleUnmute = () => {
    console.log("Unmute Button Clicked!");
    videoRef.current.muted = false;
    console.log("Button clicked! Unmuting");
    isMuted = false;
    if (typeof document !== "undefined") {
      document.getElementById("topMmessage").innerHTML =
        "DO NOT CLOSE THIS TAB";
    }
  };

  return (
    <div className="flex flex-col place-items-center bg-slate-800">
      <div className="bg-slate-400 flex justify-center items-center py-3">
        {isMuted && (
          <button
            id="btn"
            onClick={handleUnmute}
            className="bg-blue-500 rounded"
          >
            <div className="flex flex-row justify-items-center items-center px-4 py-1 gap-2">
              <span>
                <img
                  className="w-[20px]"
                  src="assets/information.png"
                  alt="information icon"
                  height="20"
                  width="20"
                />
              </span>
              <span id="topMmessage" className="text-[2px]">
                SET SAFE VOLUME LEVEL & CLICK TO UNMUTE
              </span>
              <span>
                <img
                  className="w-[20px]"
                  src="assets/information.png"
                  alt="information icon"
                  height="20"
                  width="20"
                />
              </span>
            </div>
          </button>
        )}
      </div>
      <div data-vjs-player>
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "auto",
          }}
          className="video-js vjs-control-bar"
        ></video>
      </div>
    </div>
  );
};

export default VideoPlayer;
