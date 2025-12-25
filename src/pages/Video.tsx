import React from "react";
import Trends from "../components/shared/Trends";
import VideoSection from "../components/sections/VideoSection";

const Video: React.FC = () => {
  return (
    <div>
      <Trends />
      <VideoSection />
      {/* You can customize content specific to Video here */}
    </div>
  );
};

export default Video;
