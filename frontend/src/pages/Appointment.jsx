import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocslots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    let today = new Date()
    let slots = []
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0) // 9 PM

      let timeSlots = []
      currentDate.setHours(10, 0, 0, 0) // Start at 10 AM
      while (currentDate <= endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1 // Months are zero-based
        let year = currentDate.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30) // Increment by 30 minutes
      }
      slots.push({
        day: daysOfWeek[currentDate.getDay()],
        date: currentDate.toLocaleDateString(),
        slots: timeSlots,
      })
      // setDocslots(prev => ([...prev, timeSlots]))
      setDocslots(slots)
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment")
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex].slots[0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1 // Months are zero-based
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success("Appointment booked successfully")
        getDoctorsData()
        navigate('/my-appointments')
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])
  useEffect(() => {

    console.log(docSlots)
  }, [docSlots])





  return docInfo && (
    <div className="bg-gray-50 py-12 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Doctor Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-72 h-72 rounded-full object-cover shadow-xl transform hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Doctor Information */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-3xl font-bold text-gray-800">{docInfo.name}</p>
            <img src={assets.verified_icon} alt="Verified" className="w-6 h-6" />
          </div>
          <p className="text-gray-600 text-base mb-4">{docInfo.degree} - {docInfo.speciality}</p>
          <p className="text-gray-600 text-base mb-4 flex items-center gap-2">
            <span className="text-primary font-semibold">{docInfo.experience}</span> years of experience
          </p>
          <p className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
            About <img src={assets.info_icon} alt="Info" className="w-5 h-5" />
          </p>
          <p className="text-gray-600 text-base leading-relaxed mb-4">{docInfo.about}</p>
          <p className="text-gray-800 font-semibold mb-2">
            Appointment fee: <span className="text-primary">${docInfo.fees}</span>
          </p>
        </div>
      </div>
      {/* Booking Slots */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
          Booking Slots
        </h2>

        {/* Days Selector */}
        <div className="overflow-x-auto scrollbar-hide flex gap-4 mb-8 justify-center">
          {docSlots.map((day, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full border ${slotIndex === index ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-800'
                } hover:bg-primary hover:text-white hover:shadow-md transition-all duration-300`}
              onClick={() => setSlotIndex(index)}
            >
              <p className="text-base font-semibold">{day.day}</p>
              <p className="text-sm">{day.date}</p>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="overflow-x-auto scrollbar-hide flex gap-4 p-4 bg-gray-100 rounded-lg shadow-inner">
          {docSlots[slotIndex]?.slots.map((slot, index) => (
            <button
              key={index}
              className={`px-5 py-2 rounded-lg border ${slotTime === slot.time ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-800'
                } hover:bg-primary hover:text-white hover:shadow-md transition-all duration-300`}
              onClick={() => setSlotTime(slot.time)}
            >
              {slot.time}
            </button>
          ))}
        </div>

        {/* Book Appointment Button */}
        <div className="text-center mt-8">
          <button

            className="px-8 py-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-300"
            onClick={bookAppointment}
          >
            Book an appointment
          </button>
        </div>
        {/* Listing Related Doctor */}

        <div className="mt-48"> {/* Tăng giá trị mt từ mt-30 lên mt-40 */}
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    </div>
  )
}

export default Appointment
