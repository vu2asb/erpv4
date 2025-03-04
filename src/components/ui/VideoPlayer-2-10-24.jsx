"use client";

import React from "react";
import { createRoot } from 'react-dom/client';
import ReactDom from "react-dom"
import { useRef, useEffect } from "react";
import videojs from "video.js";
/* HLS.js is a JavaScript library that enables HLS playback in browsers that don't natively support it. */
import Hls from "hls.js";
import "video.js/dist/video-js.css"; /* Video.js offers extensive customization options 
to tailor the player's appearance and behavior to your specific needs. */
import { Volume1 } from "lucide-react";

console.log("Player Component Called ...");
let pRef = null; // handler created for using Methods and Properties later
let vRef = null;
let videoDuration = 0; // create a variable to be set later with duration of video file in seconds
let isMuted = true;

const VideoPlayer = ({ src }) => {
  /* Creating a Reference to a DOM Element:- 
The useRef hook is used to 
create a mutable reference to a DOM element within a functional component. 
This reference can be used to manipulate or access the element's properties 
and methods directly. 
Accessing the Video Element:- 
In this specific case, videoRef is a reference to a video element. 
This allows you to interact with the video's playback, volume, and other attributes.*/
  const videoRef = useRef(null);

  /* Creating a Reference to a DOM Element: The useRef hook is used to create a mutable 
reference to a DOM element within a functional component. This reference can be used 
to manipulate or access the element's properties and methods directly.
Accessing the Player Element: In this specific case, playerRef is a reference to a 
player element. This allows you to interact with the player's playback, volume, and other attributes.  */
  const playerRef = useRef(null);

  // Initialization, when component loads completely.
  // Player customization and event handling here
  useEffect(() => {
    /*  The videojs() function doubles as the main function for users to create a Player 
    instance as well as the main library namespace. 
    The videoRef.current reference points to the underlying HTML video element, which 
    becomes the target for the Video.js player.  
    New player instance created. */
    playerRef.current = videojs(videoRef.current, {
      controls: false,
      muted: false,
      autoplay: true, // original val "true"
      preload: "auto",
      Volume1,
    });
    pRef = playerRef.current;

    /* The Hls.isSupported() method in the HLS.js library checks if the browser environment 
supports the necessary features for streaming HLS (HTTP Live Streaming) content.  */
    if (Hls.isSupported()) {
      console.log("HLS supported");

      /* Add HLS support for the browser that don't natively support it. 
It provides a flexible API for loading, parsing, and playing HLS streams. This object 
represents the HLS player and provides methods for configuring, loading, and playing HLS streams.*/
      const hls = new Hls();
      // Configure the HLS instance (optional)
      hls.config.maxBufferSize = 10 * 1024 * 1024; // Set maximum buffer size
      console.log("New object of HLS created");
      /* The hls.loadSource(src) method in HLS.js is used to load and play an HLS (HTTP Live Streaming) 
stream from the specified URL src. 
Parses the HLS Manifest: The method parses the HLS manifest file located at the specified URL. 
This manifest contains information about the stream's segments, quality levels, and other metadata.
Downloads Segments: Based on the information in the manifest, the HLS.js library starts downloading 
the required segments of the stream. These segments are small chunks of the video or audio content.
Decodes and Renders: As the segments are downloaded, they are decoded and rendered to the video 
element associated with the HLS instance.
*/
      hls.loadSource(src); // Load the HLS stream
      console.log("HLS stream loaded");
      /* Sets the Source: The method sets the src attribute of the video element to the URL of the HLS stream 
that was previously loaded using hls.loadSource(). 
Starts Playback: If the video element is not already playing, the method automatically starts playback. */
      hls.attachMedia(videoRef.current); // Attaches Hls.js to a media element
      console.log("Media attached");
      /* Event Listener: The hls.on() method attaches an event listener to the HLS instance.
Event Type: The event being listened for is Hls.Events.MANIFEST_PARSED. This event fires when the HLS.js 
player has successfully parsed the HLS manifest file.
Callback Function: The provided callback function is executed when the MANIFEST_PARSED event is triggered.
Video Playback: Inside the callback function, videoRef.current.play() is called. 
This attempts to start playback of the video element referenced by videoRef.current  */

      vRef = videoRef.current; // Reference to current video
      videoDuration = vRef.duration;
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Manifest parsing Okay!");
        console.log("Playing current reference");

        // videoRef.current.muted = true;
        // vRef.pause();
        videoRef.current.muted = true;
        vRef.play();
        vRef.volume = 1;
        // console.log("Video Duration (Secs): " + vRef.duration); // Get the total duration of the player
        // console.log("Video Current Time: " +(vRef.currentTime)); // Get the total duration of the player
        console.log("Volume: " + vRef.volume); // Get the current volume
        // Add event listener to unmute after playback starts
        // vRef.addEventListener("play", () => {
        //   console.log("Playback started, unmuting video");
        //   vRef.muted = false; // Unmute video
        // });
      });
    }
    // If HLS is not supported, now check if the browser's native video player can handle HLS (HTTP Live Streaming) streams.
    else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("The native video player can handle HLS");
      videoRef.current.src = src;
      videoRef.current.addEventListener("canplay", () => {
        // videoRef.current.play();
        videoRef.current.muted = true;
        videoRef.current.play();
        // videoRef.current.pause();
        // // Unmute audio after plaback starts
        // hls.on("play", () => {
        //   console.log("Serving video now ...");
        // });
      });
    }

    // If no support available for HLS; show the error.
    else {
      console.log("Video format not supported");
      // alert("Video format not supported");
    }
  }, [src]);

  let tCount = 0;
  const myInterval = setInterval(function () {
    tCount++;
    // videoRef.current.muted=false;
    // console.log("Mute status: " + videoRef.current.muted);
    console.log("Timer:: Elapsed Time: " + tCount + ""); // Tracks closely with the line below "currentTime"
    // console.log("Video Current Time: " + vRef.currentTime); // Get the total duration of the player
    if (vRef.ended) {
      console.log("Timer:: Video Ended");
      clearInterval(myInterval);
    }
  }, 1000); // Repeat every second

  let MuteToggle = document.getElementById("btn");
  let topMsg = document.getElementById("topMmessage");      

  // Function to unmute video
  const handleUnmute = () => {
    console.log("Unmute Button Clicked!");
    videoRef.current.muted = false;
    console.log("Button clicked! Unmuting");
    isMuted = false; // Update state
    // hide when clicked
    // document.getElementById("btn").style.display = "none";
    document.getElementById("topMmessage").innerHTML = "DO NOT CLOSE THIS TAB";
  };

  return (
    <div className="flex flex-col place-items-center bg-slate-800">
      <div className="bg-slate-400 flex justify-center items-center py-3">
      {isMuted && (
        <button id="btn"
        onClick={handleUnmute} className="bg-blue-500 rounded">
          <div className="flex flex-row justify-items-center items-center px-4 py-1 gap-2">
            <span>
              <img
                className="w-[20px]"
                src="assets/information.png"
                alt="information icon top bautton / bar"
                height="20"
                width="20"
              />
            </span>
            <span id="topMmessage" className="text-[5px]">SET SAFE VOLUME LEVEL & CLICK TO UNMUTE</span>
            <span>
            <img
                className="w-[20px]"
                src="assets/information.png"
                alt="information icon top bautton / bar"
                height="20"
                width="20"
              />
            </span>
          </div>
        </button>
      )}
      </div>
      <div data-vjs-player className="">
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "auto",
          }}
          className="video-js vjs-control-bar" // className="video-js vjs-control-bar"
        ></video>
      </div>
    </div>
  );
};

// {/* data-vjs-player: This is a custom HTML attribute added to the div element.
// It's used as a selector by Video.js to identify the container element where the player
// should be initialized. */}

export default VideoPlayer;
