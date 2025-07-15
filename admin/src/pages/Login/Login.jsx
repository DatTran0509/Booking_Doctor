import React from 'react'
import { useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { DoctorContext } from '../../context/DoctorContext'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                    toast.success('Admin Login successful!')
                } else {
                    toast.error(data.message)
                }
            } else {
                const {data} = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    toast.success('Doctor Login successful!')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.error('Error:', error)
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error('An unexpected error occurred. Please try again.')
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={onSubmitHandler} className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    <span>{state}</span> Login
                </h2>
                <p className="text-gray-600 mb-6">Please login to book appointment</p>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
                <div className="mt-4 text-center">
                    {state === 'Admin' ? (
                        <p className="text-gray-600">
                            Doctor Login?{' '}
                            <span
                                onClick={() => setState('Doctor')}
                                className="text-blue-500 cursor-pointer hover:underline"
                            >
                                Click Here
                            </span>
                        </p>
                    ) : (
                        <p className="text-gray-600">
                            Admin Login?{' '}
                            <span
                                onClick={() => setState('Admin')}
                                className="text-blue-500 cursor-pointer hover:underline"
                            >
                                Click Here
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Login
