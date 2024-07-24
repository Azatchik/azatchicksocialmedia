import mongoose from "mongoose";


const Music = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    artist: {type: String},
    name: {type: String},
    image: {type: String},
    file: {type: String, required: true},
    creator: {type: String, required: true},
});

export default mongoose.model('Music', Music)


