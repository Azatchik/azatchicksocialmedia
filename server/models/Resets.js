import mongoose from "mongoose";


const Resets = new mongoose.Schema({
    token: {type: String, unique: true, required: true},
    code: {type: String, required: true},
    attempts: {type: Number, required: true},
    method: {type: String, required: true},
    userPhone: {type: String, required: true},
})

export default mongoose.model('Resets', Resets)


