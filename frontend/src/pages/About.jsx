import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="bg-gray-50 py-12 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <p className="text-4xl font-bold text-gray-800 shadow-lg">
            ABOUT <span className="text-primary animate-pulse">US</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={assets.about_image}
              alt="About Us"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            </p>
            <b className="text-gray-800 text-xl font-semibold block mb-4 animate-fade-in-out">
              Our Vision
            </b>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US Section */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <p className="text-4xl font-bold text-gray-800 animate-fade-in-out shadow-lg">
            WHY <span className="text-primary animate-pulse">CHOOSE US</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Efficiency */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <b className="text-gray-800 text-xl font-semibold block mb-4 ">
              Efficiency
            </b>
            <p className="text-gray-600 text-base leading-relaxed">
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>

          {/* Convenience */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <b className="text-gray-800 text-xl font-semibold block mb-4 ">
              Convenience
            </b>
            <p className="text-gray-600 text-base leading-relaxed">
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          {/* Personalization */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <b className="text-gray-800 text-xl font-semibold block mb-4 ">
              Personalization
            </b>
            <p className="text-gray-600 text-base leading-relaxed">
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
