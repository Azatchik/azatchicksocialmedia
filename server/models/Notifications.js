import mongoose from "mongoose";


const Notifications = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    type: {type: String, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    createdAt: {type: Number, required: true},
    data: {type: Array, required: true},
    isReaded: {type: Boolean, required: true},
});

export default mongoose.model('Notifications', Notifications)


