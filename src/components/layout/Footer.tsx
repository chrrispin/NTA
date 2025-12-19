import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-10 px-6 py-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* About */}
        <div>
          <h4 className="text-md font-semibold text-gray-300 mb-1">About</h4>
          <h2 className="text-2xl font-bold mb-4 text-red-600">New Time Africa</h2>
          <div className="flex gap-4 items-start">
            <img
              src="w.PNG"
              alt="New Time Africa"
              className="w-32 h-32 object-cover rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-300">
              <span className="font-bold text-xl">New Time Africa</span> is an independent news platform based in Africa, delivering timely and trustworthy news from across the continent. We cover politics, business, health, sports, entertainment, technology, and lifestyle, providing insightful analysis and stories that inform, inspire, and connect African audiences.
            </p>
          </div>
        </div>

        {/* In Case You Missed It */}
        <div>
          <h2 className="text-xl font-bold mb-4">In Case You Missed It</h2>
          <div className="flex gap-4 items-start mb-4">
            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/230808141753-simone-biles-mental-health-break-wellness.jpg?c=16x9&q=h_438,w_780,c_fill"
              alt="simone"
              className="w-24 h-12 object-cover rounded-lg shadow-md"
            />
            <div>
              <h3 className="font-semibold text-gray-200">
                What we can learn from Simone Biles’ mental health break
              </h3>
            </div>
          </div>

          <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
            <li>
              <a href="#" className="hover:underline hover:text-blue-500">
                Italian fugitive’s love of soccer gets him caught in Greece
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-blue-500">
                Foo Fighters and Alanis Morissette pay tribute to Sinéad O’Connor
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-blue-500">
                The UK will drill for more oil and gas in the North Sea
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-blue-500">
                The minority who back Netanyahu to the hilt
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-semibold text-gray-300 mb-2">World</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline hover:text-blue-500">Africa</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">Americas</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">Asia</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">Australia</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">China</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-300 mb-2">US Politics</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline hover:text-blue-500">The Biden Presidency</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">Facts First</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">US Elections</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-300 mb-2">Business</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline hover:text-blue-500">Markets</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">Tech</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">Media</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-300 mb-2">More</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline hover:text-blue-500">Photos</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">Longform</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500">Investigations</a></li>
          </ul>
        </div>
      </div>

      {/* Search & Socials */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between gap-6">
        <form className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search New Time Africa..."
            className="border border-gray-600 p-2 rounded w-56 text-black placeholder-gray-500"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
          >
            Search →
          </button>
        </form>

        <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm justify-end">
          <div className="flex items-center gap-3 text-gray-300">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500"><i className="bi bi-facebook"></i></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-500"><i className="bi bi-twitter"></i></a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-500"><i className="bi bi-instagram"></i></a>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-400">
            <a href="#" className="hover:underline hover:text-white">Terms of Use</a>
            <a href="#" className="hover:underline hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:underline hover:text-white">Accessibility & CC</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 text-xs text-gray-500 text-center">
        &copy; 2023 New Time Africa. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
