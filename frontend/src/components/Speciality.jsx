import React from 'react'
import { assets, specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const Speciality = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div id="speciality" className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Find by Speciality</h1>
        <p className="text-gray-600 text-base mb-8">
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-center items-center">
          {specialityData.map((item, index) => (
            <Link
              onClick={() => window.scrollTo(0, 0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className="flex flex-col items-center gap-3 group transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-24 h-24 rounded-full shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-500"></div>
              </div>
              <p className="text-gray-700 text-sm font-medium group-hover:text-primary transition-colors duration-300">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Speciality