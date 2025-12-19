import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, AlertCircle, Search } from "lucide-react";

interface Ad {
  id: number;
  title: string;
  description: string;
  videoSrc?: string;
  imageSrc?: string;
  link: string;
}

const adsData: Ad[] = [
  {
    id: 1,
    title: "Big Promotions at Bridgebelt",
    description: "Explore amazing services, exclusive deals, and more!",
    videoSrc: "/HOME 30 sec.mp4",
    link: "https://bridgebelt.com/",
  },
  {
    id: 2,
    title: "Cross the Road",
    description: "Check out our latest updates and offers!",
    imageSrc: "/ad1.jpg",
    link: "https://www.mcdonalds.com/",
  },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fixedNav, setFixedNav] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showAds, setShowAds] = useState(true);
  const [activeAdIndex, setActiveAdIndex] = useState(0);

  useEffect(() => {
    const adHeight = 160;
    const handleScroll = () => {
      if (window.scrollY >= adHeight) {
        setFixedNav(true);
        setShowNav(true);
      } else {
        setFixedNav(false);
        setShowNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseAd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAds(false);
  };

  const handleAdClick = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    window.open(link, "_blank");
  };

  const activeAd = adsData[activeAdIndex];

  useEffect(() => {
    if (!showAds) return;

    const interval = setInterval(() => {
      setActiveAdIndex((prev) => (prev + 1) % adsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [showAds]);

  const location = useLocation();


  return (
    <div>
      {/* Ads Section */}
      {showAds && (
        <div className="w-full flex justify-center items-center mt-2">
          <div
            className="relative md:w-11/17 w-11/12 md:h-60 rounded-lg shadow-lg overflow-hidden cursor-pointer group"
            onClick={(e) => handleAdClick(e, activeAd.link)}
            key={activeAdIndex}
          >
            {activeAd.videoSrc && (
              <video
                src={activeAd.videoSrc}
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {activeAd.imageSrc && (
              <img
                src={activeAd.imageSrc}
                alt={activeAd.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                {activeAd.title}
              </h2>
              <p className="text-sm md:text-base text-white mt-2 drop-shadow-md">
                {activeAd.description}
              </p>
            </div>
            <div className="absolute bottom-2 right-2 flex flex-col space-y-1 z-20">
              <button
                onClick={(e) => handleAdClick(e, activeAd.link)}
                className="bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition"
                title="Learn More"
              >
                <AlertCircle className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={handleCloseAd}
                className="bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition"
                title="Close"
              >
                <X className="w-4 h-4 text-gray-800" />
              </button>
            </div>
            <span className="absolute top-0 left-0 w-full h-full animate-pulse opacity-20"></span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`bg-white shadow-md border-b border-gray-300 w-full transform transition-transform duration-500 ease-in-out ${
          fixedNav
            ? `fixed top-0 left-0 z-50 ${showNav ? "translate-y-0" : "-translate-y-20"}`
            : "relative translate-y-0"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
                className="z-50"
              >
                {menuOpen ? <X className="w-6 h-6 text-green-500" /> : <Menu className="w-6 h-6 text-green-500" />}
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center flex-shrink-0">
                <img src="/b.PNG" alt="Logo" className="h-10 w-auto" />
              </Link>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-4 text-sm">
                
                {[
                  "Home",
                  "Africa",
                  "Europe",
                  "Sports",
                  "Politics",
                  "Style",
                  "Travel",
                  "Business",
                  "Opinion",
                  "Health",
                  "Video",
                  "Entertainment",
                ].map((item) => (
                  <Link
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={`
                      hover:text-blue-600 transition 
                      ${
                        location.pathname === (item === "Home" ? "/" : `/${item.toLowerCase()}`)
                          ? "text-red-700 font-bold"
                          : "text-gray-800"
                      }
                    `}
                  >
                    {item}
                  </Link>


                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="hidden md:inline-flex items-center gap-2 text-sm hover:text-blue-600 leading-none"
              >
                <span className="relative flex items-center justify-center h-3 w-3">
                  <span className="absolute inline-flex rounded-full h-full w-full bg-red-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="font-bold">Live TV</span>
              </a>

              <a href="#" className="hidden md:inline text-green-600 text-sm hover:text-blue-600 font-bold">
                Audio
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              </a>

              <button className="text-gray-600 hover:text-blue-600 transition">
                <Search className="w-5 h-5" />
              </button>

              <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition font-bold">
                Log In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          <button
            onClick={() => setMenuOpen(false)}
            className={`self-end p-2 rounded-md transition hover:bg-gray-100 ${
              location.pathname === "/" ? "text-red-600 font-bold" : "text-gray-800"
            }`}
          >
            <X className="w-6 h-6" />
          </button>


          {[
            "Home",
            "Africa",
            "Europe",
            "Sports",
            "Politics",
            "Business",
            "Opinion",
            "Health",
            "Entertainment",
            "Style",
            "Travel",
            "Video",
          ].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className={`${fixedNav ? "h-20" : ""}`}></div>
    </div>
  );
};

export default Navbar;
