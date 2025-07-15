import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + ' ' + months[parseInt(dateArray[1]) - 1] + ' ' + dateArray[2];
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });


      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success("Appointment cancelled successfully");
        getUserAppointments();
        getDoctorsData();

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const makePayment = async (appointmentId) => {
    try {
      // Gửi yêu cầu đến backend để tạo phiên thanh toán
      const {data} = await axios.post(
        backendUrl + '/api/user/payment',
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        const { session_Url } = data; // Sử dụng đúng tên biến từ phản hồi
        // Chuyển hướng đến Stripe
        if (session_Url && session_Url.startsWith("https://")) {
          window.location.href = session_Url; // Chuyển hướng đến trang thanh toán của Stripe
        } else {
          console.error("Invalid session URL:", session_Url);
          alert("Failed to place order. Please try again.");
        }
      } else {
        console.error("Failed to create payment session:", data.message);
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("An error occurred while processing the payment.");
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <p className="text-2xl font-semibold mb-6">My Appointments</p>
      <div className="space-y-6">
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex items-start bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            {/* Doctor Image */}
            <div className="w-44 h-44 flex-shrink-0">
              <img
                src={item.docData.image}
                alt=''
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Doctor Details */}
            <div className="ml-6 flex-grow">
              <p className="text-lg font-bold">{item.docData.name}</p>
              <p className="text-gray-600">{item.docData.speciality}</p>
              <p className="text-sm font-medium mt-2">Address:</p>
              <p className="text-gray-700">{item.docData.address.address1}</p>
              <p className="text-gray-700">{item.docData.address.address2}</p>
              <p className="text-sm font-medium mt-2">
                Date & Time: <span className="text-gray-700">{slotDateFormat(item.slotDate)}| {item.slotTime}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="ml-6 flex flex-col space-y-2">
              {!item.cancelled && item.payment && !item.isCompleted &&
                <button
                  onClick={() => toast.error("Payment already done")}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
                  Payment Done
                </button>}
              {!item.cancelled && !item.payment &&!item.isCompleted &&
                <button
                  onClick={() => makePayment(item._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                  Pay Online
                </button>}
              {!item.cancelled && !item.isCompleted &&
                <button onClick={() => cancelAppointment(item._id)} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
                  Cancel Appointment
                </button>}
              {item.cancelled && !item.isCompleted &&
                <button className="bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed">
                  Appointment Cancelled
                </button>}
              {item.isCompleted &&
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg cursor-not-allowed">
                  Appointment Completed
                </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
