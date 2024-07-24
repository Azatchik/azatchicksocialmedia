import crypto from 'crypto';
import config from "../config.js";

const key = Buffer.from(config.cryptoKey);

// Шифруем данные
export function encryptData(data) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}


