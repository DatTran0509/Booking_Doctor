import validator from 'validator';
import bycrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';
// api for adding doctor
const addDoctor = async (req, res) => {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;
        //checking for all data to add doctor 
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        //validating password length
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }
        //hashing doctor password
        const salt = await bycrypt.genSalt(10);
        const hashedpassword = await bycrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resourse_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedpassword,
            speciality,
            degree,
            experience,
            about,
            fees: Number(fees),
            address: JSON.parse(address),
            date: Date.now(),
        }
        const newDoctor = await doctorModel(doctorData);
        await newDoctor.save();
        res.status(201).json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        if (error.code === 11000) {
            // Lỗi trùng lặp key (email)
            return res.status(409).json({ success: false, message: "Email already exists" });
        }
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.status(200).json({ success: true, token, message: "Admin logged in successfully" });
        }
        else {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {

    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors, message: "Doctors fetched successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get all appointments list 
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments, message: "Appointments fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get dashboard data for admin
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        
        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5), // Get the last 5 appointments
        }
        res.json({ success: true, dashData});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//API to cancel appointment by admin
const cancelAppointmentAdmin = async (req, res) => {
    try {
        const {appointmentId} = req.body
        const userId = req.userId

        const appointmentData = await appointmentModel.findById(appointmentId)
        if(!appointmentData){
            return res.json({success: false, message: "Appointment not found"})
        }
        

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
       // Update doctor's slots
       const {docId, slotDate, slotTime} = appointmentData
       const doctorData = await doctorModel.findById(docId)
       let slots_booked = doctorData.slots_booked
       slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime)
       await doctorModel.findByIdAndUpdate(docId, {slots_booked})
       res.json({success: true, message: "Appointment cancelled successfully"})

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
} 

// API to update payment status
const updatePaymentStatus = async (req, res) => {
    try {
        const {appointmentId} = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, {payment: true});
        res.json({success: true, message: "Payment status updated successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }
}
export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, cancelAppointmentAdmin, adminDashboard, updatePaymentStatus };