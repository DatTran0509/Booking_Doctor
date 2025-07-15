import React from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment, updatePaymentStatus } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <p className="text-2xl font-semibold mb-6 text-gray-800">All Appointments</p>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        {/* Tiêu đề bảng */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-4 px-6 border-b border-gray-200 bg-gray-100 text-gray-600 font-semibold text-sm">
          <p className="text-center">#</p> {/* Cột số thứ tự nhỏ */}
          <p className="text-left">Patient</p> {/* Cột Patient rộng */}
          <p className="text-center">Age</p> {/* Cột Age nhỏ */}
          <p className="text-left">Date & Time</p> {/* Cột Date & Time rộng */}
          <p className="text-left">Doctor</p> {/* Cột Doctor rộng */}
          <p className="text-center">Fees</p> {/* Cột Fees vừa phải */}
          <p className="text-center">Actions</p> {/* Cột Actions vừa phải */}
        </div>

        {/* Dữ liệu bảng */}
        {appointments.reverse().map((item, index) => (
          console.log(item.userData.dob),
          <div
            key={index}
            className="sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-4 px-6 border-b border-gray-200 items-center hover:bg-gray-50 transition-all duration-300"
          >
            {/* Số thứ tự */}
            <p className="text-center text-gray-800">{index + 1}</p>

            {/* Bệnh nhân */}
            <div className="flex items-center gap-3">
              <img
                src={item.userData.image}
                alt=""
                className="w-10 h-10 rounded-full object-cover shadow-md"
              />
              <p className="text-gray-800 font-medium">{item.userData.name}</p>
            </div>

            {/* Tuổi */}
            <p className="text-center text-gray-800">{calculateAge(item.userData.dob)}</p>

            {/* Ngày & Giờ */}
            <p className="text-left text-gray-600">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Bác sĩ */}
            <div className="flex items-center gap-3">
              <img
                src={item.docData.image}
                alt=""
                className="w-10 h-10 rounded-full object-cover shadow-md"
              />
              <p className="text-gray-800 font-medium">{item.docData.name}</p>
            </div>

            {/* Phí */}
            <div className="flex flex-col items-center">
              <p className="text-center text-gray-800 font-semibold">
                {currency}
                {item.amount}
              </p>
              {item.payment ? (
                <button
                  className="mt-2 px-4 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-300"
                  disabled
                >
                  Paid
                </button>
              ) : (
                <button
                  className="mt-2 px-4 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-300"
                  onClick={() => updatePaymentStatus(item._id)}
                >
                  Verify
                </button>
              )}
            </div>

            {/* Hành động */}
            {item.cancelled ? (
              <p className="text-red-500 font-medium text-center">Cancelled</p>
            ) : item.isCompleted
              ? <p className='text-green-400 font-medium'>Completed</p>
              :(
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
  );
};

export default AllAppointments;
