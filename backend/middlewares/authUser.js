import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = (req, res, next) => {
    
    try {
        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        // console.log("✅ Token verified:", decoded);
        req.userId = decoded.id; // Attach doctor ID to request body
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export default authUser;