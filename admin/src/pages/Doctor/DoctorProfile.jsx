import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData, backendUrl } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers: {dToken}})

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])
  return profileData && (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Hình ảnh bác sĩ */}
      <div className="flex items-start gap-6 mb-6">
        <img
          src={profileData.image}
          alt="Doctor"
          className="w-40 h-40 rounded-lg object-cover shadow-md"
        />
        <div>
          <p className="text-3xl font-semibold text-gray-800">{profileData.name}</p>
          <p className="text-lg text-gray-600">{profileData.degree} - {profileData.speciality}</p>
          <p className="text-sm text-gray-500 mt-2 bg-gray-100 px-2 py-1 rounded-lg inline-block">
            {profileData.experience} 
          </p>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800">About:</p>
          <p className="text-gray-600">{profileData.about}</p>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800">Appointment Fee:</p>
          <p className="text-gray-600">
            {currency}{' '}
            {isEdit ? (
              <input
                type="number"
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                }
                value={profileData.fees}
                className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              profileData.fees
            )}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800">Address:</p>
          <p className="text-gray-600">
            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, address1: e.target.value },
                  }))
                }
                value={profileData.address.address1}
                className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
            ) : (
              profileData.address.address1
            )}
            <br />
            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, address2: e.target.value },
                  }))
                }
                value={profileData.address.address2}
                className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              profileData.address.address2
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {isEdit ? (
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  available: e.target.checked,
                }))
              }
              className="w-5 h-5"
            />
          ) : (
            <input
              type="checkbox"
              checked={profileData.available}
              className="w-5 h-5"
              readOnly
            />
          )}
          <label className="text-gray-600">Available</label>
        </div>

        <div className="flex gap-4">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
