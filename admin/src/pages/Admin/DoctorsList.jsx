import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'


const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <h1 className=" text-2xl font-semibold text-gray-800 mb-6">All Doctors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {
                    doctors.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:bg-blue-100"
                        >
                            <img 
                                src={item.image} 
                                alt="Doctor" 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <p className="text-lg font-medium text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-600">{item.speciality}</p>
                                <div className="flex items-center mt-2">
                                    <input 
                                        onChange={()=> changeAvailability(item._id)}
                                        type="checkbox" 
                                        checked={item.available} 
                                        className="mr-2"
                                        readOnly
                                    />
                                    <p className="text-sm text-gray-600">Available</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default DoctorsList;
