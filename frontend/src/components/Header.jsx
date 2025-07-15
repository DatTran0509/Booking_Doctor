import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="bg-primary text-white py-16 md:py-24 overflow-hidden mt-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 min-h-[50vh]">
        
        {/* ---------- Left Side ---------- */}
        <div className="md:w-1/2 flex flex-col gap-6 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight animate-bounce-in">
            Book Appointment <br /> With Trusted Doctors
          </h1>

          <div className="flex items-center gap-4">
            <img src={assets.group_profiles} alt="profile group" className="w-30 h-auto animate-float" />
            <p className="text-sm md:text-base opacity-90 leading-relaxed">
              Simply browse through our extensive list of trusted doctors,<br />
              schedule your appointment hassle-free.
            </p>
          </div>

          <a
            href="#speciality"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 group w-fit animate-pulse"
          >
            Book Appointment
            <img
              src={assets.arrow_icon}
              alt="arrow icon"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </div>

        {/* ---------- Right Side ---------- */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center animate-slide-in">
          <img
            src={assets.header_img}
            alt="Doctors"
            className="w-full max-w-lg object-contain transition-transform duration-500 hover:scale-110 animate-float"
          />
        </div>
      </div>
    </div>
  )
}

export default Header
