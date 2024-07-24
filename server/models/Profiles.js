import mongoose from "mongoose";


const Profiles = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    birthDay: {type: String, required: true},
    birthMonth: {type: String, required: true},
    birthYear: {type: String, required: true},
    city: {type: String},
    languages: {type: String},
    bio: {type: String},
    education: {type: String},
    familyStatus: {type: String},
    bookmarks: {type: Array},
    lifeStatus: {type: String},
    avatar: {type: String},
    music: {type: Array},
    images: {type: Array},
    headerImg: {type: String},
    subscriptions: {type: Array},
    followers: {type: Array},
})

export default mongoose.model('Profiles', Profiles)


