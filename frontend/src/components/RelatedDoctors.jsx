import React, { useEffect, useState, useRef } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])
  const scrollContainerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (doctors.length > 0 && speciality && docId) {
      const doctorsData = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 400 // Scroll by 400px
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="mt-16">
      {/* Tiêu đề với animation */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center animate-fade-in-out">
        <span className="relative inline-block">
          <span className="absolute inset-0 bg-primary/20 rounded-lg blur-md animate-pulse-slow"></span>
          <span className="relative">Related Doctors</span>
        </span>
      </h2>

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-all duration-300 z-10"
          onClick={() => handleScroll('left')}
        >
          &#8249;
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-all duration-300 z-10"
          onClick={() => handleScroll('right')}
        >
          &#8250;
        </button>

        {/* Doctors List */}
        <div
          className="overflow-x-auto scrollbar-hide flex gap-6 px-6"
          ref={scrollContainerRef}
        >
          {relDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-36 h-36 rounded-full object-cover mb-4 transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-500"></div>
              </div>
              <div className="text-center">
                <p className="flex items-center justify-center text-green-500 text-sm font-medium mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Available
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

export default RelatedDoctors
