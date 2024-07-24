import crypto from 'crypto';
import config from "../config.js";

const key = Buffer.from(config.cryptoKey);

// Расшифровываем данные
export function decryptData(encryptedData) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

