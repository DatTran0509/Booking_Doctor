import axios from 'axios';
import { createContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const [doctors, setDoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
   
    const getAllDoctors = async() => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers: {aToken}})
            if(data.success)
            {
                setDoctors(data.doctors);
                // console.log(data.doctors);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    }
    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl + `/api/admin/change-availability`, {docId}, {headers: {aToken}})
            if(data.success)
            {
                toast.success(data.message);
                getAllDoctors();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
            
        }
    }
    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers: {aToken}})
            if(data.success)
            {
                setAppointments(data.appointments);
                // console.log(data);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    }
    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers: {aToken}})
            if(data.success)
            {
                toast.success(data.message);
                getAllAppointments();
                //getDashboardData();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    }
 
    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers: {aToken}})
            console.log(data)
            if(data.success)
            {
                setDashData(data.dashData);
                //console.log(data.dashData);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            // console.error(error);
        }
    }
    const updatePaymentStatus = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/update-payment-status', {appointmentId}, {headers: {aToken}})
            if(data.success)
            {
                toast.success(data.message);
                getAllAppointments();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    }
    const value = {
        aToken, setAToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailability,
        appointments, setAppointments,
        getAllAppointments,
        dashData, setDashData,
        getDashData,
        cancelAppointment,
        updatePaymentStatus
    };
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;