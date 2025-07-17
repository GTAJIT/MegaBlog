import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
// You can use react-icons for social icons
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center md:mb-0">
          <Logo width="100px" />
          {/* <span className="font-bold text-xl">Pawlogy</span> */}
        </div>
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} Pawlogy. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/GTAJIT" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            <FaGithub size={24} />
          </a>
          <a href="https://twitter.com/@Jit_Mukherjee05" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com/in/jit-mukherjee" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
