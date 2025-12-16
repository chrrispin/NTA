import React from "react";
import Trends from "../components/Trends";
import MainArticles from "../components/MainArticles";

const Europe: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Europe" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Europe;
