import React from "react";
import Trends from "../components/shared/Trends";
import MainArticles from "../components/layout/MainArticles";

const Entertainment: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Entertainment" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Entertainment;
