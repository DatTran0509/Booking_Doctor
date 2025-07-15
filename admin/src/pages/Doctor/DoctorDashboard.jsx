import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
const DoctorDashboard = () => {
  const { dToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getDashData();
    } else {
      toast.error("Please login first");
    }
  }
    , [dToken])
  //console.log(dashData);
  // console.log(dashData.earnings);
  return dashData && (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <img src={assets.earning_icon} alt="Doctors" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{currency}{dashData.earnings}</p>
            <p className="text-gray-600">Earnings</p>
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
                  src={item.userData.image}
                  alt="Doctor"
                  className="w-10 h-10 rounded-full object-cover shadow-md"
                />
                <div>
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600 text-sm">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
              </div>
              {
                item.cancelled
                  ? <p className='text-red-400 font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 font-medium'>Completed</p>
                    : <div className="flex justify-center gap-2">
                      {/* Nút hủy */}
                      <button
                        className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                        title="Cancel Appointment"
                        onClick={() => cancelAppointment(item._id)}
                      >
                        <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
                      </button>

                      {/* Nút xác nhận hoàn thành */}
                      <button
                        className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg ${
                          item.payment
                            ? 'bg-green-100 hover:bg-green-200'
                            : 'bg-gray-200 cursor-not-allowed'
                        }`}
                        title={item.payment ? "Approve Appointment" : "Payment Required"}
                        onClick={() => {
                          if (item.payment) {
                            completeAppointment(item._id);
                          } else {
                            toast.error('Customer has not completed payment yet!');
                          }
                        }}
                        disabled={!item.payment}
                      >
                        <img src={assets.tick_icon} alt="Approve" className="w-5 h-5" />
                      </button>
                    </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
