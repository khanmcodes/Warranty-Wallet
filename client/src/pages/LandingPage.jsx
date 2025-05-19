import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaPlus, FaReceipt, FaFilter, FaMobileAlt } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { RxLapTimer } from "react-icons/rx";
import ShinyText from "../components/ShinyText";

export default function LandingPage({ isLoggedIn }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-darkBg-900 to-darkBg-800 text-darkText">
      <nav className="border-b border-borderColor/30 backdrop-blur-md bg-darkBg-900/70 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Warranty Wallet Logo" className="h-10 w-10" />
                <span className="font-sans font-thin text-3xl text-white">
                  AULT
                </span>
              </Link>
            <div className="flex items-center">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="py-2 px-4 rounded-full font-normal text-white bg-darkBg-700 hover:bg-darkBg-600 border border-borderColor transition-all"
                >
                  <ShinyText text="Go to Dashboard" />
                </Link>
              ) : (
                <div className="space-x-3">
                  <Link
                    to="/login"
                    className="py-2 px-4 rounded-md font-medium text-white hover:text-primary transition-colors"
                  >
                    <ShinyText text="Log in" />
                  </Link>
                  <Link
                    to="/signup"
                    className="py-2 px-4 rounded-full font-normal text-white bg-darkBg-700 hover:bg-darkBg-600 border border-borderColor transition-all"
                  >
                    <ShinyText text="Sign up" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold">
              <span className="block">Never lose track of your</span>
              <span className="text-transparent bg-clip-text bg-gradient-primary">warranties again</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Wault is a vault for your warranties. It helps you organize, track, and get reminded about your product warranties in one secure place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="py-3 px-6 rounded-full font-medium text-[#1e293b] bg-primary hover:shadow-glow-primary duration-200 transition-all text-center"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="py-3 px-6 rounded-full border border-borderColor text-white hover:bg-darkBg-700 transition-all text-center"
              >
                <ShinyText text="Learn More"/>
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
                <div className="p-4 rounded-xl bg-darkBg-800/50 border border-borderColor flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">Macbook</h4>
                      <p className="text-sm text-gray-400">Expires in 10 months</p>
                    </div>
                    <div className={`w-2 h-8 rounded-full bg-green-500`}></div>
                </div>
                <div className="p-4 rounded-xl bg-darkBg-800/50 border border-borderColor flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">iPhone 13</h4>
                      <p className="text-sm text-gray-400">Expires in 3 months</p>
                    </div>
                    <div className={`w-2 h-8 rounded-full bg-yellow-500`}></div>
                </div>
                <div className="p-4 rounded-xl bg-darkBg-800/50 border border-borderColor flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">Smart TV</h4>
                      <p className="text-sm text-gray-400">Expired 2 months ago</p>
                    </div>
                    <div className={`w-2 h-8 rounded-full bg-red-500`}></div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Warranty Wallet makes managing your product warranties simple and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-accent h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-primary">
                <FaPlus className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Organization</h3>
              <p className="text-gray-400">
                Add, categorize, and access all your warranty information in one organized place.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-error h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <RxLapTimer className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expiry Tracking</h3>
              <p className="text-gray-400">
                Never miss an expiry date with visual indicators for expiring and expired warranties.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-blue h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <FaReceipt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Receipt Storage</h3>
              <p className="text-gray-400">
                Store receipt images directly with each warranty for easy access when needed.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-warning h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <FaBarsProgress className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Status Visualization</h3>
              <p className="text-gray-400">
                Visual progress bars show how much of your warranty period has been used.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <FaFilter className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Filtering</h3>
              <p className="text-gray-400">
                Easily filter your warranties by status, expiration date, or product type.
              </p>
            </div>

            <div className="bg-darkBg-900/50 backdrop-blur-sm p-6 rounded-xl border border-borderColor shadow-dark">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 h-12 w-12 rounded-full flex items-center justify-center mb-4 shadow-glow-accent">
                <FaMobileAlt className="text-white" />
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
        <div className="absolute z-0">
          <div className="absolute opacity-90"></div>
          <div className="absolute bg-gradient-to-r from-primary/20 to-accent/20"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-medium mb-3">
              Create your <span className="text-gradient-primary font-thin"><span className="font-bold">W</span>AULT</span> now!
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Start managing your warranties today
            </p>
            <Link
              to="/signup"
              className="py-4 px-8 text-lg rounded-full font-medium text-[#1e293b]  bg-primary hover:shadow-glow-primary duration-200 transition-all text-center"
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
            <Link to="/" className="flex items-center">
                <img src={logo} alt="Warranty Wallet Logo" className="h-20 w-20" />
                <span className="font-sans font-thin text-6xl text-white">
                  AULT
                </span>
              </Link>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Wault. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 