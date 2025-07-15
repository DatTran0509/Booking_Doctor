import React from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbav = () => {
    const { aToken, setAToken, userData } = useContext(AdminContext);
    const {dToken, setDToken} = useContext(DoctorContext);
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        if (aToken) {
            setAToken('');
            localStorage.removeItem('aToken');
        }
        if (dToken) {
            setDToken('');
            localStorage.removeItem('dToken');
        }
    };

    return (
        <div className="flex justify-between items-center px-6 sm:px-12 py-4 border-b bg-white shadow-md">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <img
                    className="w-36 sm:w-40 cursor-pointer"
                    src={assets.admin_logo}
                    alt="Admin Logo"
                />
                <p className="border px-3 py-1 rounded-full border-gray-400 text-gray-700 text-sm font-medium">
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>

            {/* Logout Button */}
            <button onClick={logout} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Logout
            </button>
        </div>
    );
};

export default Navbav;
