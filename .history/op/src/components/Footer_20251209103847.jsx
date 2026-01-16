import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 overflow-hidden relative">
      {/* Gradient Accent */}
     
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          
          {/* Company Info */}
          <div className="max-w-xs space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-xl tracking-wider">U</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black leading-tight">Digital Express<sup className="text-xs text-gray-600">®</sup></h3>
                <p className="text-sm text-gray-600 mt-1">Premium Digital Solutions</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Transforming businesses with cutting-edge digital solutions that drive growth and success in the modern world.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-600 transition-all duration-300 flex items-center justify-center group">
                <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-pink-600 transition-all duration-300 flex items-center justify-center group">
                <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-400 transition-all duration-300 flex items-center justify-center group">
                <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center group">
                <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

         

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-black mb-5 uppercase tracking-wider flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mr-2"></span>
              Popular Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Google Services", path: "/subservice/1/subservices" },
                { name: "Google Ads", path: "/subservice/2/subservices" },
                { name: "Website Development", path: "/subservice/3/subservices" },
                { name: "App Development", path: "/subservice/4/subservices" },
                { name: "CRM Software", path: "/subservice/5/subservices" },
                { name: "Combo Services", path: "/subservice/8/subservices" }
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path} 
                    className="text-sm text-gray-700 hover:text-black transition-all duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-cyan-500 transition-colors"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="max-w-xs">
            <h3 className="text-sm font-semibold text-black mb-5 uppercase tracking-wider flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-2"></span>
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-purple-600 transition-all duration-300">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <a href="tel:+919667277348" className="text-sm text-black hover:text-purple-600 transition-colors block font-medium">
                    +91 96672 77348
                  </a>
                  <p className="text-xs text-gray-600 mt-1">Mon-Sat, 9AM-7PM</p>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-pink-600 transition-all duration-300">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:info@digitalexpress.com" className="text-sm text-black hover:text-pink-600 transition-colors font-medium">
                  info@digitalexpress.com
                </a>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-blue-600 transition-all duration-300">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Mumbai, Maharashtra</p>
                  <p className="text-xs text-gray-600 mt-1">India</p>
                </div>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-xs font-semibold text-black mb-3 uppercase tracking-wider">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 text-sm bg-gray-100 border border-gray-300 text-black placeholder-gray-500 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300"
                />
                <button className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium rounded-r-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">Get the latest updates and offers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 text-center md:text-left">
              © {currentYear} <span className="text-black font-medium">Digital Express<sup className="text-xs">®</sup></span>. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link to="/privacy" className="text-gray-600 hover:text-black transition-colors hover:underline">
                Privacy Policy
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/terms" className="text-gray-600 hover:text-black transition-colors hover:underline">
                Terms of Service
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/refund" className="text-gray-600 hover:text-black transition-colors hover:underline">
                Refund Policy
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/sitemap" className="text-gray-600 hover:text-black transition-colors hover:underline">
                Sitemap
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Secure Payments:</span>
              <div className="flex space-x-2">
                <div className="w-6 h-4 bg-gray-300 rounded border border-gray-400"></div>
                <div className="w-6 h-4 bg-gray-300 rounded border border-gray-400"></div>
                <div className="w-6 h-4 bg-gray-300 rounded border border-gray-400"></div>
                <div className="w-6 h-4 bg-gray-300 rounded border border-gray-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button - Remains same */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/919667277348"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group relative"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
          </svg>
          <span className="absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with us
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;