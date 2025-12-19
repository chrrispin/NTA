import React from "react";
import Trends from "../components/shared/Trends";
import MainArticles from "../components/layout/MainArticles";

const Home: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Home;
