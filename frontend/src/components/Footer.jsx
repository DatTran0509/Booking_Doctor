import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo và mô tả */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-4 md:ml-auto">
          <p className="text-gray-800 font-semibold text-lg">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm">
            <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Home</li>
            <li className="hover:text-primary transition-colors duration-300 cursor-pointer">About us</li>
            <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Contact us</li>
            <li className="hover:text-primary transition-colors duration-300 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col gap-4 md:ml-auto">
          <p className="text-gray-800 font-semibold text-lg">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm">
            <li className="hover:text-primary transition-colors duration-300 cursor-pointer">0844376333</li>
            <li className="hover:text-primary transition-colors duration-300 cursor-pointer">dat881070@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center">
        <p className="text-gray-600 text-sm">© 2025 Booking Doctor Appointment. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
