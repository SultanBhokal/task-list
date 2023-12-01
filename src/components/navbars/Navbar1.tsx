import React, { useState } from 'react';

const Navbar1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">Your Logo</div>

        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path d="M19 13H5v-2h14v2z" />
            ) : (
              <>
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3 4h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
              </>
            )}
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-4">
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
