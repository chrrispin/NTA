import React from "react";
import Trends from "../components/Trends";
import MainArticles from "../components/MainArticles";

const Politics: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Politics" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Politics;
