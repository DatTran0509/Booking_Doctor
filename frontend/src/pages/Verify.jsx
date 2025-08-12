import React, { use, useContext, useEffect } from 'react'
import './Verify.css'
import {AppContext} from '../context/AppContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const appointmentId = searchParams.get('appointmentId')
    const {backend_Url, token} = useContext(AppContext)
    const navigate = useNavigate()
    
    const verifyPayment = async () =>{
        try {
            const response = await axios.post(`${backend_Url}/api/user/verify`, {
                success, 
                appointmentId
            }, {
                headers: {token: token}
            });
            
            if(response.data.success){
                navigate("/my-appointments");
            }
            else{
                navigate("/")
            }
        } catch (error) {
            console.error("Payment verification error:", error);
            navigate("/")
        }
    }
    
    useEffect(() => {
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify
