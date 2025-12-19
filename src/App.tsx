
import { Routes, Route } from "react-router-dom"; // ✅ import routing
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

// Import pages
import Home from "./pages/Home";
import Africa from "./pages/Africa";
import Europe from "./pages/Europe";
import Sports from "./pages/Sports";
import Video from "./pages/Video";
import Travel from "./pages/Travel";
import Style from "./pages/Style";
import Politics from "./pages/Politics";
import Opinion from "./pages/Opinion";
import Health from "./pages/Health";
import Entertainment from "./pages/Entertainment";
import Business from "./pages/Business";
import ArticleDetail from "./pages/ArticleDetail";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      <Header />
      <Navbar />

      {/* Main content changes based on route */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/africa" element={<Africa />} />
          <Route path="/europe" element={<Europe />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/politics" element={<Politics />} />
          <Route path="/business" element={<Business />} />
          <Route path="/opinion" element={<Opinion />} />
          <Route path="/health" element={<Health />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/style" element={<Style />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/video" element={<Video />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
