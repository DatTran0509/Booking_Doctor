import jwt from "jsonwebtoken";

// doctor authentication middleware
const authDoctor = (req, res, next) => {
    
    try {
        const {dtoken} = req.headers;
        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET); 
        // console.log("✅ Token verified:", decoded);
        req.docId = decoded.id; // Attach doc ID to request body
        // console.log(req.docId);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export default authDoctor;