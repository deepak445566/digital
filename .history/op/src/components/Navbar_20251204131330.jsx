import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { forgingProducts } from "../data/data";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";

// Capabilities data without subServices
const capabilitiesData = [
  {
    id: 1,
    title: "Forging",
    path: "/forgingexpertise",
  },
  {
    id: 2,
    title: "Heat Treatment",
    path: "/heat",
  },
  {
    id: 3,
    title: "Precision Machining",
    path: "/precision",
  },
  {
    id: 4,
    title: "Manufacturing Capabilities",
    path: "/manu",
  },
  {
    id: 5,
    title: "Material Grades",
    path: "/material-grades",
  }
];

// Quality data with sub-options
const qualityData = [
  {
    id: 1,
    title: "Quality Assurance & Control",
    path: "/quality",
  },
  {
    id: 2,
    title: "Certification",
    path: "/certificate",
  }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [qualityOpen, setQualityOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileCapabilitiesOpen, setMobileCapabilitiesOpen] = useState(false);
  const [mobileQualityOpen, setMobileQualityOpen] = useState(false);
  
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className={`w-full ${isHomePage ? 'bg-transparent absolute top-0 left-0 right-0' : 'bg-white fixed top-0 left-0 right-0 shadow-md'} z-50`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 lg:px-7 py-2">
        <Link
          to="/"
          className={`text-[16px] lg:text-lg font-bold ${isHomePage ? 'text-white drop-shadow-lg' : 'text-gray-800'} flex items-center gap-2 exo`}
        >
          <img src="/images/logo.png" className="h-15 w-15 lg:h-18 lg:w-18 bg-white rounded-full" alt="Ishan Forgings Logo" />
          <h1 className="w-[60%] lg:w-full">Ishaan Forgings india Private Limited</h1>
        </Link>

        <button
          className={`md:hidden ${isHomePage ? 'text-white' : 'text-gray-800'} text-3xl ${isHomePage ? 'drop-shadow-lg' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex flex-col md:flex-row gap-6 md:gap-5 mt-4 md:mt-0 exo">
            {/* Home */}
            <li>
              <Link
                to="/"
                className={`${isHomePage ? 'text-white hover:text-orange-300 drop-shadow-lg' : 'text-gray-800 hover:text-orange-500'} font-medium transition-colors duration-300`}
              >
                Home
              </Link>
            </li>

            {/* Products Dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => {
                setProductOpen(false);
                setHoveredProduct(null);
              }}
            >
              <button className={`${isHomePage ? 'text-white hover:text-orange-300 drop-shadow-lg' : 'text-gray-800 hover:text-orange-500'} font-medium flex items-center gap-1 transition-colors duration-300`}>
                Products
                <FiChevronRight className="transform group-hover:rotate-90 transition-transform" />
              </button>

              <div
                className={`absolute -left-30 mt-3 w-64 bg-white rounded-lg shadow-xl border border-gray-200 transition-all ${
                  productOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <ul className="py-3">
                  {forgingProducts.map((item) => (
                    <li
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setHoveredProduct(item.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Products with subServices */}
                      {item.subServices && item.subServices.length > 0 ? (
                        <div className="flex items-center justify-between">
                          <span className="w-full text-left block px-4 py-2 hover:bg-[#F6F7F9] hover:text-[#FF6333] text-gray-800">
                            {item.title}
                          </span>
                          <FiChevronRight className="text-gray-400 mr-2" />
                        </div>
                      ) : (
                        <Link
                          to={`/product/${item.id}`}
                          className="block px-4 py-2 hover:bg-[#F6F7F9] hover:text-[#FF6333] text-gray-800"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )}

                      {/* Submenu for products with subServices */}
                      {item.subServices && item.subServices.length > 0 && hoveredProduct === item.id && (
                        <div
                          className="absolute left-64 top-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 transition-all opacity-100 visible"
                          style={{ maxHeight: "80vh", overflowY: "auto" }}
                        >
                          <ul className="py-3">
                            {item.subServices.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  to={`/product/${item.id}/${sub.id}`}
                                  className="block px-4 py-2 hover:bg-[#F6F7F9] hover:text-[#FF6333] text-gray-800"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Capabilities Dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => setCapabilitiesOpen(true)}
              onMouseLeave={() => setCapabilitiesOpen(false)}
            >
              <button className={`${isHomePage ? 'text-white hover:text-orange-300 drop-shadow-lg' : 'text-gray-800 hover:text-orange-500'} font-medium flex items-center gap-1 transition-colors duration-300`}>
                Capabilities
                <FiChevronRight className="transform group-hover:rotate-90 transition-transform" />
              </button>

              <div
                className={`absolute -left-30 mt-3 w-64 bg-white rounded-lg shadow-xl border border-gray-200 transition-all ${
                  capabilitiesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <ul className="py-3">
                  {capabilitiesData.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        className="block px-4 py-2 hover:bg-[#F6F7F9] hover:text-[#FF6333] text-gray-800"
                        onClick={() => {
                          setMenuOpen(false);
                          setCapabilitiesOpen(false);
                        }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Quality Dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => setQualityOpen(true)}
              onMouseLeave={() => setQualityOpen(false)}
            >
              <button className={`${isHomePage ? 'text-white hover:text-orange-300 drop-shadow-lg' : 'text-gray-800 hover:text-orange-500'} font-medium flex items-center gap-1 transition-colors duration-300`}>
                Quality
                <FiChevronRight className="transform group-hover:rotate-90 transition-transform" />
              </button>

              <div
                className={`absolute -left-30 mt-3 w-64 bg-white rounded-lg shadow-xl border border-gray-200 transition-all ${
                  qualityOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <ul className="py-3">
                  {qualityData.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        className="block px-4 py-2 hover:bg-[#F6F7F9] hover:text-[#FF6333] text-gray-800"
                        onClick={() => {
                          setMenuOpen(false);
                          setQualityOpen(false);
                        }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Industries - Direct Link (No Dropdown) */}
            <li>
              <Link
                to="/industry"
                className={`${isHomePage ? 'text-white hover:text-orange-300 drop-shadow-lg' : 'text-gray-800 hover:text-orange-500'} font-medium transition-colors duration-300`}
              >
                Industries
              </Link>
            </li>

            {/* About Us */}
            <li>
              <Link
                to="/about"
                className={`${isHomePage ? 'text-white hover:text-orange-300 drop-shadow-lg' : 'text-gray-800 hover:text-orange-500'} font-medium transition-colors duration-300`}
              >
                About Us
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contact"
                className={`${isHomePage ? 'text-white hover:text-orange-300 drop-shadow-lg' : 'text-gray-800 hover:text-orange-500'} font-medium transition-colors duration-300`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute h-[80vh] left-0 right-0 bg-white/90 backdrop-blur-sm exo">
          <div className="px-4 py-6">
            <ul className="flex flex-col gap-6">
              <li>
                <Link
                  to="/"
                  className="text-black hover:text-orange-300 font-medium text-lg transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* Mobile Products */}
              <li>
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="w-full flex items-center justify-between text-black hover:text-orange-300 font-medium text-lg transition-colors duration-300"
                >
                  Products
                  <FiChevronRight
                    className={`transform transition-transform ${
                      mobileProductsOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {mobileProductsOpen && (
                  <ul className="mt-2 pl-4 flex flex-col gap-2">
                    {forgingProducts.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.id ? `/product/${item.id}` : "/products"}
                          className="text-black hover:text-orange-300 text-base block"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                        
                        {/* Show subServices for both Custom Forgings and ASME Pressure Vessel Connections */}
                        {item.subServices && item.subServices.length > 0 && (
                          <ul className="pl-4 mt-1 flex flex-col gap-1">
                            {item.subServices.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  to={`/product/${item.id}/${sub.id}`}
                                  className="text-gray-600 hover:text-orange-300 text-sm block py-1"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  • {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Mobile Capabilities */}
              <li>
                <button
                  onClick={() => setMobileCapabilitiesOpen(!mobileCapabilitiesOpen)}
                  className="w-full flex items-center justify-between text-black hover:text-orange-300 font-medium text-lg transition-colors duration-300"
                >
                  Capabilities
                  <FiChevronRight
                    className={`transform transition-transform ${
                      mobileCapabilitiesOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {mobileCapabilitiesOpen && (
                  <ul className="mt-2 pl-4 flex flex-col gap-2">
                    {capabilitiesData.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.path}
                          className="text-black hover:text-orange-300 text-base block py-2"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Mobile Quality */}
              <li>
                <button
                  onClick={() => setMobileQualityOpen(!mobileQualityOpen)}
                  className="w-full flex items-center justify-between text-black hover:text-orange-300 font-medium text-lg transition-colors duration-300"
                >
                  Quality
                  <FiChevronRight
                    className={`transform transition-transform ${
                      mobileQualityOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {mobileQualityOpen && (
                  <ul className="mt-2 pl-4 flex flex-col gap-2">
                    {qualityData.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.path}
                          className="text-black hover:text-orange-300 text-base block py-2"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Mobile Industries - Direct Link */}
              <li>
                <Link
                  to="/industry"
                  className="text-black hover:text-orange-300 font-medium text-lg transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Industries
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-black hover:text-orange-300 font-medium text-lg transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-black hover:text-orange-300 font-medium text-lg transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;