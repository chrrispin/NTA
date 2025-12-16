
import { Routes, Route } from "react-router-dom"; // ✅ import routing
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";

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

// Admin pages
import Admin from "./pages/Admin";
import AdminArticles from "./pages/AdminArticles";
import AdminArticleForm from "./pages/AdminArticleForm";

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

          {/* Admin routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/articles/new" element={<AdminArticleForm />} />
          <Route path="/admin/articles/:id/edit" element={<AdminArticleForm />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
