import Profiles from "../models/Profiles.js";
import Music from "../models/Music.js";
import FileService from "../services/fileService.js";
import * as uuid from "uuid";
import music from "../models/Music.js";

class musicController {
    async getMusic(req, res) {
        try {
            const { profileId, limit, page, random, userProfileId } = req.body;

            if(!profileId || !limit || !page) {
                return res.status(400).json({
                    message: 'EmptyDataError: profileId, limit, page',
                })
            }

            const profile = await Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({
                    message: 'ProfileNotFoundError: profile with the id not found',
                })
            }

            if (!random) {
                const musicIds = profile.music.reverse().slice((page - 1) * limit, limit * page);
                const music = await Music.find({id: {$in: musicIds}});
                const profileMusic = music.length
                    ? musicIds.map((musicId) => music.find((item) => item.id === musicId))
                    : [];



                let userProfileMusicIds;
                if(userProfileId) {
                    const userProfile = await Profiles.findOne({id: userProfileId});
                    userProfileMusicIds = userProfile.music;
                }

                return res.status(200).json({
                    music: profileMusic,
                    currentProfileMusic: userProfileMusicIds ? userProfileMusicIds.reverse() : [],
                })
            } else {
                const music = await Music.find({id: {$in: profile.music}});
                const shuffleMusic = music.sort(() => Math.random() - 0.5).slice(0, 8);
                return res.status(200).json({
                    music: shuffleMusic,
                })
            }
        } catch (e) {
            res.status(500).json({message: e});
        }
    }

    async addMusic(req, res) {
        try {
            const files = req.files;
            const { profileId } = req.body;

            if(!profileId || !files) {
                return res.status(400).json({
                    message: 'EmptyDataError: profileId, musicFile required',
                })
            }

            const musicFile = files.music;

            const profile = await Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({
                    message: 'ProfileNotFoundError: profile with the id not found',
                })
            }


            const memory = await Math.floor(Buffer.byteLength(musicFile.data) / 1048576);
            if(memory > 120) {
                return res.status(400).json({
                    message: 'LargeFileSizeError: file size too large, must be no more than 120 mb!',
                })
            }

            const {
                file,
                artist,
                name,
                image,
            } = await FileService.saveMusic(musicFile, 'profiles').catch(() => {
                return res.status(500).json({message: 'ImageProcessingError: file server error'})
            });


            const musicId = uuid.v4();
            const newMusic = new Music({
                id: musicId,
                artist: artist,
                name: name,
                image: image,
                file: file,
                creator: profileId,
            });
            await newMusic.save();

            await Profiles.updateOne({id: profileId}, {
                $push: {music: musicId},
            })


            return res.status(200).json({
                music: {
                    id: musicId,
                    artist: artist,
                    name: name,
                    image: image,
                    file: file,
                    creator: profileId,
                },
            })
        } catch (e) {
            res.status(500).json({message: e});
        }
    }
    async getRecommendations(req, res) {
        try {
            const { profileId } = req.body;

            if(!profileId) {
               return res.status(400).json({message: 'EmptyDataError: profileId required'})
            }

            const profileData = await Profiles.findOne({id: profileId});
            if(!profileData || !profileData.id) {
                return res.status(400).json({message: 'ProfileNotFoundError: Profile with the profileId not found'})
            }

            const recommendationMusic = await Music.find({id: { $nin: profileData.music}}).limit(60);
            const shuffledRecommendations = recommendationMusic.sort(() => Math.random() - 0.5).slice(0, 15);

            return res.status(200).json({
                recommendationMusic: shuffledRecommendations,
            })
        } catch (e) {
            res.status(500).json({message: e});
        }
    }
    async searchMusic(req, res) {
        try {
            const { profileId, query, limit } = req.body;

            if(!profileId || !query || !limit) {
                return res.status(400).json({message: 'EmptyDataError: profileId, query, limit required'})
            }

            const profileData = await Profiles.findOne({id: profileId});
            if(!profileData || !profileData.id) {
                return res.status(400).json({message: 'ProfileNotFoundError: Profile with the profileId not found'})
            }

            const searchedMusic = await Music.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { artist: { $regex: query, $options: 'i' } }
                ]
            }).limit(limit);


            return res.status(200).json({
                searchedMusic,
                currentProfileMusic: profileData.music,
            })
        } catch (e) {
            res.status(500).json({message: e});
        }
    }
}

export default new musicController();
