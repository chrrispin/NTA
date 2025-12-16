import React from "react";
import Trends from "../components/Trends";
import MainArticles from "../components/MainArticles";

const Sports: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Sports" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Sports;
