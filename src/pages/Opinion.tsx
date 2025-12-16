import React from "react";
import Trends from "../components/Trends";
import MainArticles from "../components/MainArticles";

const Opinion: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Opinion" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Opinion;
