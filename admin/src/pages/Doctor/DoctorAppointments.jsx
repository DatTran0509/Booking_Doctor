import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <p className="text-2xl font-semibold mb-6 text-gray-800">All Appointments</p>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        {/* Tiêu đề bảng */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_2fr_3fr_1fr_1fr] gap-4 py-4 px-6 border-b border-gray-200 bg-gray-100 text-gray-600 font-semibold text-sm">
          <p className="text-center">#</p>
          <p className="text-left">Patient</p>
          <p className="text-center">Payment</p>
          <p className="text-center">Age</p>
          <p className="text-left">Date & Time</p>
          <p className="text-center">Fees</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Dữ liệu bảng */}
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_3fr_1fr_2fr_3fr_1fr_1fr] gap-4 py-4 px-6 border-b border-gray-200 items-center hover:bg-gray-50 transition-all duration-300"
          >
            {/* Số thứ tự */}
            <p className="text-center text-gray-800">{index + 1}</p>

            {/* Bệnh nhân */}
            <div className="flex items-center gap-3">
              <img
                src={item.userData.image}
                alt="Patient"
                className="w-10 h-10 rounded-full object-cover shadow-md"
              />
              <p className="text-gray-800 font-medium">{item.userData.name}</p>
            </div>

            {/* Thanh toán */}
            <p className="text-center text-gray-600">{item.payment ? 'Online' : 'Cash'}</p>

            {/* Tuổi */}
            <p className="text-center text-gray-800">{calculateAge(item.userData.dob)}</p>

            {/* Ngày & Giờ */}
            <p className="text-left text-gray-600">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Phí */}
            <p className="text-center text-gray-800 font-semibold">
              {currency}
              {item.amount}
            </p>

            {/* Hành động */}
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
                          ? 'bg-green-100 hover:bg-green-300'
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
  )
}

export default DoctorAppointments
