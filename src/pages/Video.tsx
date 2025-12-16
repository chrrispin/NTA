import React from "react";
import Trends from "../components/Trends";
import MainArticles from "../components/MainArticles";

const Video: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Video" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Video;
