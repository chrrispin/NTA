import React from "react";
import Trends from "../components/Trends";
import MainArticles from "../components/MainArticles";

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
