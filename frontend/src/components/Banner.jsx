import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-primary mx-4 md:mx-8 lg:mx-20 rounded-lg overflow-hidden relative my-20">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-12 md:py-16">
        
        {/* -------------- Left Side ----------*/}
        <div className="md:w-1/2 flex flex-col gap-6 z-10 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Book Appointment
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 leading-tight">
              With 100+ Trusted Doctors
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/login', { state: { mode: 'Sign Up' } })}
            className="bg-white text-primary font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-50 hover:scale-105 transform transition-all duration-300 w-fit group"
          >
            <span className="group-hover:tracking-wide transition-all duration-300">
              Create account
            </span>
          </button>
        </div>

        {/* -------------- Right Side ----------*/}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0 animate-slide-in relative z-20">
          <div className="relative">
            <img 
              src={assets.appointment_img} 
              alt="Doctor"
              className="w-full max-w-[18rem] md:max-w-[22rem] lg:max-w-[24rem] h-auto object-contain transform hover:scale-105 transition-transform duration-500 filter brightness-110 contrast-110"
            />
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/30 rounded-full animate-bounce shadow-lg"></div>
            <div className="absolute top-1/2 -left-6 w-6 h-6 bg-white/25 rounded-full animate-pulse shadow-md"></div>
            <div className="absolute bottom-8 -right-8 w-10 h-10 bg-white/20 rounded-full animate-bounce delay-500 shadow-lg"></div>
          </div>
        </div>

        {/* Background decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 z-0"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/3 to-transparent z-0"></div>
      </div>
    </div>
  )
}

export default Banner
