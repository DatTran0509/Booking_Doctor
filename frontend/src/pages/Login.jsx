import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
const Login = () => {
  const {backendUrl, token, setToken} = useContext(AppContext)
  const location = useLocation()
  const [state, setState] = useState(location.state?.mode || "Login")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate()


  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if(state === "Sign Up") {
        const {data} = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password
        })
        if(data.success) {
          setToken(data.token)
          localStorage.setItem("token", data.token)

        } else {
          toast.error(data.message)
        }
      }
      else if(state === "Login") {
        const {data} = await axios.post(backendUrl + "/api/user/login", {
          email,
          password
        })
        if(data.success) {
          setToken(data.token)
          localStorage.setItem("token", data.token)
          
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
      console.error("Error during authentication:", error)
    }
  }
  useEffect(() => {
    if (token) {
      if(token){
        navigate("/")
      }
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-500"
      >
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-gray-800 ">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p className="text-gray-600">
            Please {state === "Sign Up" ? "sign up" : "login"} to book an appointment.
          </p>
        </div>

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Full Name</label>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              value={name}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Email</label>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-2">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <button
          
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="text-center mt-4">
          {state === "Sign Up" ? (
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-purple-500 cursor-pointer hover:underline"
              >
                Login 
              </span>
            </p>
          ) : (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-purple-500 cursor-pointer hover:underline"
              >
                Sign Up 
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login
