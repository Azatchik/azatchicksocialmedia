import jwt from "jsonwebtoken";
import config from "../config.js";


const generateToken = (id, device, sessionId) => {
    const payload = {
        id,
        device,
        sessionId,
    }
    return jwt.sign(payload, config.SECRET_JWT_KEY, {expiresIn: "24h"})
}

export default generateToken;
