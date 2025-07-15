import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext.jsx'
import { AdminContext } from '../../context/AdminContext.jsx'
import { useEffect } from 'react'
import { assets } from '../../assets/assets.js'

const Dashboard = () => {
  const { aToken, dashData, cancelAppointment, getDashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <img src={assets.doctor_icon} alt="Doctors" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.doctors}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <img src={assets.appointment_icon} alt="Appointments" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.appointments}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <img src={assets.patients_icon} alt="Patients" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.patients}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={assets.list_icon} alt="Latest Appointments" className="w-6 h-6" />
            <p className="text-lg font-semibold text-gray-800">Latest Appointments</p>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.docData.image}
                  alt="Doctor"
                  className="w-10 h-10 rounded-full object-cover shadow-md"
                />
                <div>
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600 text-sm">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
              </div>
              {item.cancelled ? (
                <p className="text-red-500 font-medium text-center">Cancelled</p>
              ) : item.isCompleted
                ? <p className='text-green-400 font-medium'>Completed</p>
                : (
                  <div className="flex justify-center">
                    <button
                      className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                      title="Cancel Appointment"
                      onClick={() => cancelAppointment(item._id)}
                    >
                      <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
                    </button>
                  </div>
                )
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
