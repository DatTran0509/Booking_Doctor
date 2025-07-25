import express from 'express';
import {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, adminDashboard, cancelAppointmentAdmin, updatePaymentStatus} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import {changeAvailability} from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors',authAdmin,  allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointmentAdmin); // Assuming this is the correct endpoint for cancelling appointments
adminRouter.get('/dashboard', authAdmin, adminDashboard);
adminRouter.post('/update-payment-status', authAdmin, updatePaymentStatus);
export default adminRouter;   