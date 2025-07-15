import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="bg-gray-50 py-12 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <p className="text-4xl font-bold text-gray-800">
            CONTACT <span className="text-primary animate-pulse">US</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={assets.contact_image}
              alt="Contact Us"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <p className="text-gray-800 text-xl font-semibold mb-4">Our OFFICE</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Tel: (415) 555‑0132 <br />
              Email: greatstackdev@gmail.com
            </p>
            <p className="text-gray-800 text-xl font-semibold mb-4">Careers at PRESCRIPTO</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Learn more about our teams and job openings.
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
