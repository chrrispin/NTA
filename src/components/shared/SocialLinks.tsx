import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";

const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-8 text-gray-300 text-lg">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.facebook.com/profile.php?id=61573766336552#"
        aria-label="Facebook"
        className="hover:text-blue-500 transition"
      >
        <FaFacebookF className="w-5 h-5" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.instagram.com/newtimeafrica/?hl=en"
        aria-label="Instagram"
        className="hover:text-blue-500 transition"
      >
        <FaInstagram className="w-5 h-5" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.youtube.com/@Newtimeafrica"
        aria-label="YouTube"
        className="hover:text-red-500 transition"
      >
        <FaYoutube className="w-5 h-5" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.linkedin.com/company/110327042/admin/dashboard/"
        aria-label="LinkedIn"
        className="hover:text-blue-400 transition"
      >
        <FaLinkedinIn className="w-5 h-5" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.tiktok.com/@newtimesafrica?_r=1&_t=ZM-92VrJuCWa67"
        aria-label="TikTok"
        className="hover:text-white transition"
      >
        <FaTiktok className="w-5 h-5" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://x.com/newtimeafrica"
        aria-label="X"
        className="hover:text-white transition"
      >
        <FaXTwitter className="w-5 h-5" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="mailto:newtimeafrica@gmail.com"
        aria-label="Email"
        className="hover:text-blue-500 transition"
      >
        <FaEnvelope className="w-5 h-5" />
      </a>
    </div>
  );
};

export default SocialLinks;
