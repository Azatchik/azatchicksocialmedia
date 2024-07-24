import mongoose from "mongoose";


const Authentications = new mongoose.Schema({
    token: {type: String, unique: true, required: true},
    code: {type: String, required: true},
    phone: {type: String, unique: true, required: true},
    attempts: {type: Number, required: true},
})

export default mongoose.model('Authentications', Authentications)


