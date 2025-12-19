import React from "react";
import Trends from "../components/shared/Trends";
import MainArticles from "../components/layout/MainArticles";

const Africa: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Africa" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Africa;
