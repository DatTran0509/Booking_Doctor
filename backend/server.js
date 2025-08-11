import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS Configuration - ĐẶT TRƯỚC CÁC ROUTES
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://booking-doctor-client.vercel.app',  // Frontend URL
    'https://your-admin-url.vercel.app'          // Admin URL (nếu có)
]

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true)
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}))

// Handle preflight requests
app.options('*', cors())

// middleware
app.use(express.json());

// api endpoint
app.use('/api/admin', adminRouter); // localhost:4000/api/admin/add-doctor
app.use('/api/doctor', doctorRouter); 
app.use('/api/user', userRouter); 

app.get('/', (req, res) => {
    res.send('Welcome to the Booking Doctor Appointment API!');
});

// app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

// Export app để Vercel dùng
export default app;