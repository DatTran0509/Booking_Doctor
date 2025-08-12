import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary' 
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Stripe from 'stripe';
// API to register user
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if(!name || !password || !email){
            return res.json({success: false, message: "Missing Details"})
        }
        // validating email format
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Enter a valid email"})
        }
        // validating strong password
        if(password.length < 6){
            return res.json({success: false, message: "Enter a trong password"})
        }
        
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
        )
        res.json({success: true, token})

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message: "User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch)
        {
            const token = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET,
            )
            res.json({success: true, token})
        }
        else{
            res.json({success: false, message: "Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }   
}
// API to get user profile data
const getProfile = async (req, res) => {
    try {
        // Tìm user trong cơ sở dữ liệu
        const userData = await userModel.findById(req.userId).select("-password");
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to update use profile
const updateProfile = async (req, res) => {
    try {
        const {name, phone, address, dob, gender} = req.body
        const userId = req.userId
        const imageFile = req.file  
        

        // console.log("User ID:", req.userId);
        // console.log("Request Body:", req.body);
        // console.log("Name:", name);
        if(!name || !phone || !dob || !gender)
        {
            return res.json({success: false, message: "Missing Details"})
        }
        

        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})
        if(imageFile)
        {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, {image: imageURL})
        }
        res.json({success: true, message: "Profile updated successfully"})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
        
    }
}
// API to book appoint ment
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime} = req.body
        const userId = req.userId
        const docData = await doctorModel.findById(docId).select("-password")

        if(!docData.available){
            return res.json({success: false, message: "Doctor is not available"})
        }
        let slots_booked = docData.slots_booked
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success: false, message: "Slot is not available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }
        else
        {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete docData.slots_booked
        // Kiểm tra dữ liệu trước khi lưu
        // if (!userId || !userData || !docData.fee) {
        //     return res.json({ success: false, message: "Missing required fields" });
        // }
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now(),
        }

        const newAppointmet = new appointmentModel(appointmentData)
        await newAppointmet.save()

        //save new slots data
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        res.json({success: true, message: "Appointment booked successfully"})

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

// API to get user appointments for forntend my-appointments page
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const appointments = await appointmentModel.find({userId}).sort({date: -1})
        res.json({success: true, appointments})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

// API to cancell appointment
const cancelAppointment = async (req, res) => {
    try {
        const {appointmentId} = req.body
        const userId = req.userId

        const appointmentData = await appointmentModel.findById(appointmentId)
        if(!appointmentData){
            return res.json({success: false, message: "Appointment not found"})
        }
        if(appointmentData.userId !== userId){
            return res.json({success: false, message: "You are not authorized to cancel this appointment"})
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

// API to make payment of appoinment using stripe

const makePayment = async (req, res) => {
    const FRONTEND_URL = process.env.FRONTEND_URL 
    // console.log('FRONTEND_URL: ', FRONTEND_URL);
    try {
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        console.log('appointmentId: ', appointmentId);
        const{amount} = appointmentData
        //console.log('amount:', amount);
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        //console.log('Stripe initialized:', stripe);
        const session = await stripe.checkout.sessions.create({
            line_items: [{

                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Appointment Fee',
                    },
                    unit_amount: amount * 100, // Convert to cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${FRONTEND_URL}/verify?success=true&appointmentId=${appointmentId}`,
            cancel_url: `${FRONTEND_URL}/verify?success=false&appointmentId=${appointmentId}`,
        });
        //console.log('session_Url: ', session.url);
        res.json({success: true, session_Url: session.url});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}
const verifyPayment = async (req, res) => {
    const {appointmentId, success} = req.body;
   try {
    if(success === 'true'){
        await appointmentModel.findByIdAndUpdate(appointmentId, {payment: true})
        res.json({success: true, message: "Payment successful"});
    }
    else{
        await appointmentModel.findByIdAndUpdate(appointmentId, {payment: false})
        res.json({success: false, message: "Payment failed"});
    }
   } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
   }
}
export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, makePayment, verifyPayment};