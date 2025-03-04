"use client";

import VideoPlayer from "@/components/ui/VideoPlayer"

const Player = () => {
    console.log("Page calling VideoPlayer component");
  return (
    <div>
        <VideoPlayer src={"https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"}></VideoPlayer>
        {/* https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8 */}
        {/* video/eternals.m3u8 */}
        {/* https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8 */}
        {/* https://ireplay.tv/test/blender.m3u8 */}
        {/* https://test-streams.mux.dev/dai-discontinuity-deltatre/manifest.m3u8 */}
        {/* https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8 */}
        {/* https://ireplay.tv/test/blender.m3u8 */}

        
    </div>
  )
}

export default Player
