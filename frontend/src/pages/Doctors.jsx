import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const { doctors } = useContext(AppContext)
  const [selectedSpeciality, setSelectedSpeciality] = useState(speciality || null)

  const appplyFilter = () => {
    if (selectedSpeciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === selectedSpeciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    appplyFilter()
  }, [selectedSpeciality, doctors])

  const navigate = useNavigate()

  const handleSpecialityClick = (spec) => {
    if (selectedSpeciality === spec) {
      setSelectedSpeciality(null) // Reset to show all doctors
      navigate('/doctors') // Navigate back to the main doctors page
    } else {
      setSelectedSpeciality(spec) // Set the selected speciality
      navigate(`/doctors/${spec}`) // Navigate to the selected speciality
    }
  }

  return (
    <div className="bg-gray-50 py-12 px-6 md:px-12 lg:px-20">
      <p className="text-gray-800 text-lg font-semibold mb-6">Browse through the doctors specialist.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Speciality Filter */}
        <div className="md:col-span-1 flex flex-col gap-4">
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec, index) => (
            <button
              key={index}
              className={`text-left px-4 py-2 rounded-lg border ${selectedSpeciality === spec ? 'bg-primary text-white' : 'bg-white text-gray-800'
                } hover:bg-primary hover:text-white transition-all duration-300`}
              onClick={() => handleSpecialityClick(spec)}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctors List */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-44 h-44 rounded-full object-cover mb-4 transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-500"></div>
              </div>
              <div className="text-center">
                <p className="flex items-center justify-center text-sm font-medium mb-2">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${item.available ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                  ></span>
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
                <p className="text-gray-800 text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
