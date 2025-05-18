import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function LandingPage({ isLoggedIn }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-darkBg-900 to-darkBg-800 text-darkText">
      <nav className="border-b border-borderColor/30 backdrop-blur-md bg-darkBg-900/70 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Warranty Wallet Logo" className="h-10 w-10 mr-2" />
                <span className="font-bold text-xl text-white">
                  Warranty Wallet
                </span>
              </Link>
            <div className="flex items-center">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="py-2 px-4 rounded-md font-medium text-white bg-gradient-primary hover:shadow-glow-primary transition-all"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="space-x-3">
                  <Link
                    to="/login"
                    className="py-2 px-4 rounded-md font-medium text-white hover:text-primary transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="py-2 px-4 rounded-md font-medium text-[#1e293b] bg-gradient-primary hover:shadow-glow-primary transition-all"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              <span className="block">Never lose track of your</span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">warranties again</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Warranty Wallet helps you organize, track, and get reminded about your product warranties in one secure place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="py-3 px-6 rounded-lg font-medium text-[#1e293b] bg-gradient-primary hover:shadow-glow-primary transition-all text-center"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="py-3 px-6 rounded-lg border border-borderColor text-white hover:bg-darkBg-700 transition-all text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-primary rounded-3xl blur-xl opacity-75"></div>
            <div className="relative bg-darkBg-800 p-6 rounded-2xl border border-borderColor shadow-dark">
              <div className="rounded-xl overflow-hidden backdrop-blur-sm bg-darkBg-900/30 border border-borderColor shadow-dark">
                <div className="p-4 border-b border-borderColor">
                  <h3 className="text-lg font-semibold">Your Warranties</h3>
                </div>
                <div className="p-5 space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div 
                      key={item} 
                      className="p-4 rounded-xl bg-darkBg-800/50 border border-borderColor flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-semibold">
                          {item === 1 ? "MacBook Pro" : item === 2 ? "iPhone 13" : "Smart TV"}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {item === 1 ? "Expires in 10 months" : item === 2 ? "Expires in 3 months" : "Expired 2 months ago"}
                        </p>
                      </div>
                      <div className={`w-2 h-8 rounded-full ${
                        item === 1 ? "bg-green-500" : item === 2 ? "bg-yellow-500" : "bg-red-500"
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-darkBg-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Features designed for you
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Warranty Wallet makes managing your product warranties simple and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-primary h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Organization</h3>
              <p className="text-gray-400">
                Add, categorize, and access all your warranty information in one organized place.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-warning h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expiry Tracking</h3>
              <p className="text-gray-400">
                Never miss an expiry date with visual indicators for expiring and expired warranties.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-accent h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Receipt Storage</h3>
              <p className="text-gray-400">
                Store receipt images directly with each warranty for easy access when needed.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-error h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Status Visualization</h3>
              <p className="text-gray-400">
                Visual progress bars show how much of your warranty period has been used.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Filtering</h3>
              <p className="text-gray-400">
                Easily filter your warranties by status, expiration date, or product type.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile Friendly</h3>
              <p className="text-gray-400">
                Access your warranty information on any device, anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-darkBg-900 opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to simplify your warranty management?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Join thousands of users who've already streamlined their warranty tracking experience.
            </p>
            <Link
              to="/signup"
              className="py-4 px-8 text-lg rounded-lg font-medium text-[#1e293b] bg-gradient-primary hover:shadow-glow-primary transition-all"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-darkBg-900 border-t border-borderColor/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img src={logo} alt="Warranty Wallet Logo" className="h-10 w-10 mr-2" />
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                Warranty Wallet
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Warranty Wallet. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 