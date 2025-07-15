import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useContext } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const {backendUrl, aToken} = useContext(AdminContext)
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        try {
            if (!docImg || !name || !email || !password || !experience || !fees || !about || !degree || !address1 || !address2) {
                alert("Please fill all the fields");
                return;
            }
            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', fees);
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ address1, address2 }));
            
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            })

            const { data } = await axios.post(
                backendUrl + '/api/admin/add-doctor',
                formData,
                { headers: {aToken} }
            );
            if(data.success){
                toast.success(data.message);
                setDocImg(false);
                setName('');
                setEmail('');
                setPassword('');
                setExperience('');
                setFees('');
                setAbout('');
                setDegree('');
                setAddress1('');
                setAddress2('');
    
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("Email already exists. Please use a different email.");
            } else {
                toast.error(error.response ? error.response.data.message : "Something went wrong");
            }
            console.log(error);
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <p className="text-2xl font-semibold text-gray-800 mb-6">Add Doctor</p>
        
        {/* Upload Doctor Picture */}
        <div className="flex flex-col items-center mb-8">
            <label htmlFor="doc-img" className="cursor-pointer">
                <img 
                    src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} 
                    alt="Upload Doctor" 
                    className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-all duration-300" 
                />
            </label>
            <input onChange ={(e)=>setDocImg(e.target.files[0])}type="file" id="doc-img" hidden />
            <p className="text-gray-600 text-center mt-2">Upload doctor picture</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <p className="text-gray-700 font-medium mb-2">Doctor Name</p>
                <input 
                    onChange={(e) => setName(e.target.value)} value={name}
                    type="text" 
                    placeholder="Name" 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                />
            </div>
            <div>
                <p className="text-gray-700 font-medium mb-2">Doctor Email</p>
                <input 
                    onChange={(e) => setEmail(e.target.value)} value={email}
                    type="email" 
                    placeholder="Your email" 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                />
            </div>
            <div>
                <p className="text-gray-700 font-medium mb-2">Doctor Password</p>
                <input 
                    onChange={(e) => setPassword(e.target.value)} value={password}
                    type="password" 
                    placeholder="Password" 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                />
            </div>
            <div>
                <p className="text-gray-700 font-medium mb-2">Experience</p>
                <select
                    onChange={(e) => setExperience(e.target.value)} value={experience} 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                    <option value="">Experience</option>
                    {[...Array(10)].map((_, i) => (
                        <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
                    ))}
                </select>
            </div>
            <div>
                <p className="text-gray-700 font-medium mb-2">Fees</p>
                <input 
                    onChange={(e) => setFees(e.target.value)} value={fees}
                    type="number" 
                    placeholder="Your fees" 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                />
            </div>
            <div>
                <p className="text-gray-700 font-medium mb-2">Speciality</p>
                <select 
                    onChange={(e) => setSpeciality(e.target.value)} value={speciality}
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                    <option value="General physician">General physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
            </div>
            <div>
                <p className="text-gray-700 font-medium mb-2">Education</p>
                <input 
                    onChange={(e) => setDegree(e.target.value)} value={degree}
                    type="text" 
                    placeholder="Education" 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                />
            </div>
            <div>
                <p className="text-gray-700 font-medium mb-2">Address</p>
                <input 
                    onChange={(e) => setAddress1(e.target.value)} value={address1}
                    type="text" 
                    placeholder="Address 1" 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 mb-3" 
                />
                <input  
                    onChange={(e) => setAddress2(e.target.value)} value={address2}
                    type="text" 
                    placeholder="Address 2" 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" 
                />
            </div>
            <div className="col-span-2">
                <p className="text-gray-700 font-medium mb-2">About Doctor</p>
                <textarea 
                    onChange={(e) => setAbout(e.target.value)} value={about}
                    placeholder="Write about yourself" 
                    rows={5} 
                    required 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                ></textarea>
            </div>
        </div>

        {/* Submit Button */}
        <button 
            type='submit'
            className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 mt-6"
        >
            Add doctor
        </button>
    </form>
  )
}

export default AddDoctor
