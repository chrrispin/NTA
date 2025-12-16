import React from "react";
import Trends from "../components/Trends";
import MainArticles from "../components/MainArticles";

const Health: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Health" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Health;
