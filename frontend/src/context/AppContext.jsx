import {createContext, useEffect} from 'react';
import axios from 'axios';
import React, {useState} from 'react';
export const AppContext = createContext();
import {toast} from 'react-toastify'
const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
    const [userData, setUserData] = useState(false);

    const [doctors, setDoctors] = useState([]);
    

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success) {
                setDoctors(data.doctors);
            }
            else
            {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: {
                    token: token
                }
            });
            // console.log(data);
            if(data.success) {
                setUserData(data.userData);
                // console.log("User data loaded successfully:", data.userData);
            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        doctors,
        currencySymbol,
        token, setToken,
        backendUrl,
        getDoctorsData,
        userData, setUserData,
        loadUserProfileData,
    };
    useEffect(() => {
        getDoctorsData();
    }
    , []);
    useEffect(() => {
        if(token) {
            loadUserProfileData();
        }
        else{
            setUserData(false);
        }
    }
    , [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;