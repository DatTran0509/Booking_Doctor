import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [scrolling, setScrolling] = useState(false)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (!scrolling && scrollContainerRef.current) {
        const container = scrollContainerRef.current

        // Kiểm tra nếu đã cuộn đến cuối
        if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' }) // Cuộn về đầu
        } else {
          container.scrollBy({ left: 400, behavior: 'smooth' }) // Cuộn tiếp
        }
      }
    }, 2000) // Chạy mỗi 3 giây

    return () => clearInterval(scrollInterval)
  }, [scrolling])

  const handleScroll = () => {
    setScrolling(true)
    setTimeout(() => setScrolling(false), 2000) // Reset trạng thái cuộn sau 5 giây
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Top Doctors to Book</h1>
        <p className="text-gray-600 text-base">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>
      {/* Grid bác sĩ dạng một dòng */}
      <div
        className="overflow-x-auto scrollbar-hide"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <div className="grid grid-flow-col auto-cols-max gap-6 px-6">
          {doctors.slice(0, 10).map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-45 h-48 rounded-full object-cover mb-4 transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-500"></div>
              </div>
              <div className="text-center">
                <p className="flex items-center justify-center text-sm font-medium mb-2">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      item.available ? 'bg-green-500' : 'bg-gray-300'
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
      <div className="text-center mt-8">
        <button
          onClick={() => {
            navigate('/doctors')
            scrollTo(0, 0)
          }}
          className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition duration-300"
        >
          More
        </button>
      </div>
    </div>
  )
}

export default TopDoctors