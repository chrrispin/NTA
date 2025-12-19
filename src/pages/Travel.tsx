import React from "react";
import Trends from "../components/shared/Trends";
import MainArticles from "../components/layout/MainArticles";

const Travel: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Travel" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Travel;
