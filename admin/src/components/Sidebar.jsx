import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)
    return (
        <div className="w-64 bg-gradient-to-b from-white to-gray-100 shadow-lg rounded-lg h-auto p-4 border-r border-gray-300">
            {
                aToken && <ul className="space-y-4">
                    <NavLink
                        to="/admin-dashboard"
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-blue-100 scale-105 shadow-md border-r-4 border-blue-500'
                                : 'hover:bg-gray-200 hover:scale-105'
                            }`
                        }
                    >
                        <img src={assets.home_icon} alt="Dashboard Icon" className="w-6 h-6 mr-3" />
                        <p className="text-gray-800 font-medium">Dashboard</p>
                    </NavLink>

                    <NavLink
                        to="/all-appointments"
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-blue-100 scale-105 shadow-md border-r-4 border-blue-500'
                                : 'hover:bg-gray-200 hover:scale-105'
                            }`
                        }
                    >
                        <img src={assets.appointment_icon} alt="Appointments Icon" className="w-6 h-6 mr-3" />
                        <p className="text-gray-800 font-medium">Appointments</p>
                    </NavLink>

                    <NavLink
                        to="/add-doctor"
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-blue-100 scale-105 shadow-md border-r-4 border-blue-500'
                                : 'hover:bg-gray-200 hover:scale-105'
                            }`
                        }
                    >
                        <img src={assets.add_icon} alt="Add Doctor Icon" className="w-6 h-6 mr-3" />
                        <p className="text-gray-800 font-medium">Add Doctor</p>
                    </NavLink>

                    <NavLink
                        to="/doctor-list"
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-blue-100 scale-105 shadow-md border-r-4 border-blue-500'
                                : 'hover:bg-gray-200 hover:scale-105'
                            }`
                        }
                    >
                        <img src={assets.people_icon} alt="Doctor List Icon" className="w-6 h-6 mr-3" />
                        <p className="text-gray-800 font-medium">Doctor List</p>
                    </NavLink>
                </ul>
            }


            {
                dToken && <ul className="space-y-4">
                    <NavLink
                        to="/doctor-dashboard"
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-blue-100 scale-105 shadow-md border-r-4 border-blue-500'
                                : 'hover:bg-gray-200 hover:scale-105'
                            }`
                        }
                    >
                        <img src={assets.home_icon} alt="Dashboard Icon" className="w-6 h-6 mr-3" />
                        <p className="text-gray-800 font-medium">Dashboard</p>
                    </NavLink>

                    <NavLink
                        to="/doctor-appointments"
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-blue-100 scale-105 shadow-md border-r-4 border-blue-500'
                                : 'hover:bg-gray-200 hover:scale-105'
                            }`
                        }
                    >
                        <img src={assets.appointment_icon} alt="Appointments Icon" className="w-6 h-6 mr-3" />
                        <p className="text-gray-800 font-medium">Appointments</p>
                    </NavLink>

                    <NavLink
                        to="/doctor-profile"
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-blue-100 scale-105 shadow-md border-r-4 border-blue-500'
                                : 'hover:bg-gray-200 hover:scale-105'
                            }`
                        }
                    >
                        <img src={assets.people_icon} alt="Doctor List Icon" className="w-6 h-6 mr-3" />
                        <p className="text-gray-800 font-medium">Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
