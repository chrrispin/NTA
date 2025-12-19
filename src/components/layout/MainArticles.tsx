import React from "react";
import RightSidebar from "../sections/RightSidebar";
import LeftMainSection from "../sections/LeftMainSection";
import News4Section from "../sections/News4Section";
import News5Section from "../sections/News5Section";
import News7Section from "../sections/News7Section";
import SampleArticleCard from "../articles/SampleArticleCard";
import FeatureHighlights from "../sections/FeatureHighlights";
import TrendingNews from "../sections/TrendingNews";
import VideoSpotlight from "../sections/VideoSpotlight";
import HotNews from "../sections/HotNews";
import AudioCarousel from "../sections/AudioCarousel";
import MoreNews from "../sections/MoreNews";

const MainArticles: React.FC = () => {
  return (
    <main className="px-4 py-6 max-w-7xl mx-auto grid gap-6 grid-cols-1 lg:grid-cols-3">
      {/* Left - main articles wide */}
      <LeftMainSection />
      {/* Right - side columns */}
      <RightSidebar />
      {/* featured / lower sections spanning full width */}
      <News4Section />
      {/* news5, news6, news7 are similar - render simple grids or lists dynamically */}
      <News5Section />
      <SampleArticleCard />
      <News7Section />
      {/* Independent section components */}
      <FeatureHighlights />
      <TrendingNews />
      <VideoSpotlight />
      <HotNews />
      <AudioCarousel />
      <MoreNews />
    </main>
  );
};

export default MainArticles;