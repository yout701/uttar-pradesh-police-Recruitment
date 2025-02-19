import React, { useState } from "react";
import logo from "./images/logo.png";
import banner from "./images/banner-1.jpg";
import { FaHome, FaUser, FaFileDownload, FaInfoCircle } from "react-icons/fa";

const App = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!registrationNumber || !dob.day || !dob.month || !dob.year) {
        throw new Error("Please fill in all fields");
      }

      const filename = `${registrationNumber}.pdf`;
      const filePath = `${process.env.PUBLIC_URL}/files/${filename}`;

      // Check if file exists
      const response = await fetch(filePath);
      if (!response.ok) throw new Error("File not found");

      // Trigger download
      const link = document.createElement("a");
      link.href = filePath;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset form after successful download
      setRegistrationNumber("");
      setDob({ day: "", month: "", year: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              alt="Uttar Pradesh Police Logo"
              className="w-16 h-16 mr-4"
              src={logo}
            />
            <div>
              <h1 className="text-red-600 text-xl font-bold">
                उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड
              </h1>
              <h2 className="text-red-600 text-lg">
                Uttar Pradesh Police Recruitment &amp; Promotion Board
              </h2>
            </div>
          </div>
          <div>
            <a
              className="text-red-600 text-lg flex flex-col items-center hover:text-red-700"
              href="#"
            >
              <FaHome className="text-xl mb-1" />
              <span className="hidden md:inline">Home</span>
            </a>
          </div>
        </div>

        {/* Banner */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          <img
            alt="Police Officers in Uniform"
            className="w-full h-64 object-cover"
            src={banner}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center space-y-2">
              <h3 className="text-white text-2xl md:text-3xl font-bold">
                Direct Recruitment
              </h3>
              <h3 className="text-white text-2xl md:text-3xl font-bold">
                for the Post of Constable
              </h3>
              <h3 className="text-white text-2xl md:text-3xl font-bold">
                (Civil Police) - 2023
              </h3>
            </div>
          </div>
        </div>

        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Services Card */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <FaUser className="mr-2" /> Candidate Services
              </h3>
              <div className="space-y-4">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg transition-all flex items-center justify-center">
                  <FaFileDownload className="mr-2" />
                  Download Admit Card
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all">
                  Application Status
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-all">
                  New Registration
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <FaInfoCircle className="mr-2" /> Help Desk
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Email: support@uppb.in</p>
                <p>Phone: 1800-123-4567</p>
                <p>Office Hours: 9 AM - 5 PM</p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
            <h4 className="bg-orange-600 text-white text-center py-3 rounded-t-xl text-xl font-semibold mb-6">
              अभ्यर्थी लॉग इन / Candidate Login
            </h4>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  पंजीकरण संख्या / Registration Number
                </label>
                <input
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter Registration Number"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  जन्म तिथि / Date of Birth
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <select
                    className="border border-gray-300 p-3 rounded-lg"
                    value={dob.day}
                    onChange={(e) => setDob({ ...dob, day: e.target.value })}
                  >
                    <option value="">Day</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border border-gray-300 p-3 rounded-lg"
                    value={dob.month}
                    onChange={(e) => setDob({ ...dob, month: e.target.value })}
                  >
                    <option value="">Month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, index) => (
                      <option key={index + 1} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>

                  <select
                    className="border border-gray-300 p-3 rounded-lg"
                    value={dob.year}
                    onChange={(e) => setDob({ ...dob, year: e.target.value })}
                  >
                    <option value="">Year</option>
                    {[...Array(100)].map((_, i) => (
                      <option key={2023 - i} value={2023 - i}>
                        {2023 - i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "दाखिल करना / Sign In"}
                </button>

                <button
                  type="button"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-all"
                >
                  पंजीकरण संख्या भूल गए / Forgot Registration Number
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
