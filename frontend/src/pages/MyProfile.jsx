import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx'
import { assets } from '../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [image, setImage] = useState(false)

  const [isEdit, setIsEdit] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('dob', userData.dob);
      formData.append('gender', userData.gender);

      image && formData.append('image', image);

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}})
      if (data.success) {
        toast.success("Profile updated successfully");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);

      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return userData && (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
      {
        isEdit
          ? <label htmlFor='image'>
             <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opcaity-75' src={image ? URL.createObjectURL(image): userData.image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image ? '': assets.upload_icon} alt="" />
             </div>
             <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
          </label>
          :
          <img
            className="w-24 h-24 rounded-full mx-auto shadow-md"
            src={userData.image}
            alt="Profile"
          />
      }

      <div className="text-center mt-4">
        {isEdit ? (
          <input
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="text-xl font-semibold">{userData.name}</p>
        )}
      </div>
      <hr className="my-4 border-gray-300" />
      <div>
        <p className="text-lg font-bold mb-2">CONTACT INFORMATION</p>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">Email:</p>
            <p className="text-gray-700">{userData.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-lg font-bold mb-2">BASIC INFORMATION</p>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        {isEdit ? (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={updateUserProfileData}
          >
            Save information
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
