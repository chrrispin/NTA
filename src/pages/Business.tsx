import React from "react";
import Trends from "../components/shared/Trends";
import MainArticles from "../components/layout/MainArticles";

const Business: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles pageFilter="Business" />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Business;
