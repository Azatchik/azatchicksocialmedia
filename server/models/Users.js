import mongoose from "mongoose";


const Users = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    phone: {type: String, unique: true, required: true},
    email: {type: String},
    profileId: {type: String},
    password: {type: String},
    authorizedDevices: {type: Array},
})

export default mongoose.model('Users', Users)


