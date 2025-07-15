import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available,
        });
        res.status(200).json({ success: true, message: "Doctor availability changed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.status(200).json({ success: true, doctors, message: "Doctors fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API for doctor login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (isMatch) {
            const token = jwt.sign(
                { id: doctor._id },
                process.env.JWT_SECRET,
            );
            res.status(200).json({ success: true, token });
        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {

    }
}

// API to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.docId;
        const appointments = await appointmentModel.find({ docId })
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//API to mark appointments  complepletd for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment marked as completed" });
        }
        else {
            return res.status(404).json({ success: false, message: "Appointment not found or unauthorized access" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API to cancel appointments  for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: "Appointment cancel" });
        }
        else {
            return res.status(404).json({ success: false, message: "Cancel failed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId;
        const appointments = await appointmentModel.find({ docId });
        let earnings = 0;
        let patients = []
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })
       
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.slice(-5).reverse(),
        }
        res.json({ success: true, dashData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// API to get doctor profile for Doctor Panel
const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const profileData = await doctorModel.findById(docId).select(['-password', '-email']);
        if (!profileData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
// API to update doctor profile data from Doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const {fees, address, available} = req.body;

        await doctorModel.findByIdAndUpdate(docId, {fees, address, available});
        res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor,
     appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile };