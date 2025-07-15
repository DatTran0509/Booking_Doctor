import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
const Navbar = () => {
  const navigate = useNavigate()
  const {token, setToken, userData} = useContext(AppContext) // Lấy token từ context
  const [showMenu, setShowMenu] = useState(false) // State cho Mobile Menu
  const [showDropdown, setShowDropdown] = useState(false) // State cho Dropdown Menu
  const logout = async () => {
    setToken(false) // Xóa token
    localStorage.removeItem("token") // Xóa token khỏi localStorage
    //navigate('/login') // Chuyển hướng đến trang đăng nhập
  }

  return (
    <div className="top-0 left-0 z-50 flex items-center justify-between py-4 px-6 border-b border-gray-200 shadow-sm bg-white">
      {/* Logo */}
      <img onClick={() => navigate("/")} className="w-45 cursor-pointer" src={assets.logo} alt="Logo" />

      {/* Menu */}
      <ul className="hidden md:flex items-center gap-8 text-base font-medium text-gray-700">
        <NavLink to="/">
          <li className="flex flex-col items-center hover:text-primary">
            HOME
            <hr className="w-4/5 h-0.5 bg-primary mt-1 border-none transition-all duration-300 hidden" />
          </li>
        </NavLink>

        <NavLink to="/doctors">
          <li className="flex flex-col items-center hover:text-primary">
            ALL DOCTORS
            <hr className="w-4/5 h-0.5 bg-primary mt-1 border-none transition-all duration-300 hidden" />
          </li>
        </NavLink>

        <NavLink to="/about">
          <li className="flex flex-col items-center hover:text-primary">
            ABOUT
            <hr className="w-4/5 h-0.5 bg-primary mt-1 border-none transition-all duration-300 hidden" />
          </li>
        </NavLink>

        <NavLink to="/contact">
          <li className="flex flex-col items-center hover:text-primary">
            CONTACT
            <hr className="w-4/5 h-0.5 bg-primary mt-1 border-none transition-all duration-300 hidden" />
          </li>
        </NavLink>
      </ul>

      {/* Account section */}
      <div className="flex items-center gap-5">
        {token && userData? (
          <div
            className="flex items-center gap-2 relative cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)} // Toggle trạng thái dropdown
          >
            <img className="w-9 h-9 rounded-full object-cover" src={userData.image} alt="User" />
            <img className="w-3" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 py-3 px-4 z-50 text-sm text-gray-700 space-y-2">
                <p onClick={() => navigate('/my-profile')} className="hover:text-primary cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-primary cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-red-500 cursor-pointer">Logout</p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary/90 transition text-white px-6 py-2 rounded-full hidden md:block"
          >
            Login/Sign Up
          </button>
        )}
        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="Menu Icon" />
        {/* Mobile Menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="Logo" />
            <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close Icon" />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium text-gray-700">
            <NavLink onClick={() => setShowMenu(false)} to="/"><p className="px-4 py-2 rounded inline-block" >Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block" >ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about"><p className="px-4 py-2 rounded inline-block" >ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block" >CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
