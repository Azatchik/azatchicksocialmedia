import Users from "../models/Users.js";
import Profiles from "../models/Profiles.js";
import generateToken from "../services/generateToken.js";
import * as uuid from "uuid";
import getRandom from "../services/getRandom.js";
import FileService from "../services/fileService.js";

class profilesController {
    async createProfile(req, res) {
        try {
            const {
                id,
                firstName,
                secondName,
                birthDay,
                birthMonth,
                birthYear,
                device,
            } = req.body;

            const isRegistratedUser = await Users.findOne({id: id});
            if(!isRegistratedUser.password) {
                return res.status(400).json({message: 'NotFoundError: User is not registrated'})
            }

            const isCreatedProfile = await Profiles.findOne({id: isRegistratedUser.profileId});
            if(isCreatedProfile) {
                return res.status(400).json({message: 'ProfileAlreadyExistError: This user already have profile!'})
            }


            const profileId = uuid.v4();
            const newProfile = new Profiles({
                id: profileId,
                firstName: firstName,
                secondName: secondName,
                birthDay: birthDay,
                birthMonth: birthMonth,
                birthYear: birthYear,
            })
            await newProfile.save();

            await Users.updateOne({id: id}, {
                $set: {profileId: profileId}
            })

            const jwtToken = generateToken(id, device, Date.now());


            await Users.updateOne({profileId: profileId}, {
                $push: {authorizedDevices: jwtToken}
            })

            return res.status(200).json({
                profileId: profileId,
                token: jwtToken,
            })
        } catch (e) {
            res.status(500).json({message: e});
        }
    }

    async getProfile(req, res) {
        try {
            const { profileId } = req.body;

            if(!profileId) {
                return res.status(400).json({message: 'EmptyProfileIdError: profileId required'});
            }

            const profileData = await Profiles.findOne({id: profileId});

            if(!profileData) {
                return res.status(404).json({message: 'NotFoundProfileError: Profile with this profileId not found'});
            }


            return res.status(200).json(profileData);
        } catch (e) {
            res.status(500).json({ message: e})
        }
    }
    async getSubscriptions(req, res) {
        try {
            const { profileId, number } = req.body;

            if(!profileId) {
                return res.status(400).json({message: 'EmptyProfileIdsError: profileId required'});
            }

            const profile = await Profiles.findOne({id: profileId});
            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: profile with the profileId not found'});
            }

            let subscriptions;
            const profiles = await Profiles.find({id: {$in: profile.subscriptions}});
            if (number) {
                const shuffledProfiles = profiles.sort(() => Math.random() - 0.5);
                subscriptions = shuffledProfiles.slice(0, number);
            } else {
                subscriptions = profiles.reverse();
            }


            const result = subscriptions.map(profile => ({
                profileId: profile.id,
                firstName: profile.firstName,
                secondName: profile.secondName,
                avatar: profile.avatar,
                city: profile.city,
            }))

            return res.status(200).json({
                members: result,
            });
        } catch (e) {
            res.status(500).json({ message: e})
        }
    }

    async getFollowers(req, res) {
        try {
            const { profileId, number } = req.body;

            if(!profileId) {
                return res.status(400).json({message: 'EmptyProfileIdsError: profileId required'});
            }

            const profile = await Profiles.findOne({id: profileId});
            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: profile with the profileId not found'});
            }

            let followers;
            const profiles = await Profiles.find({id: {$in: profile.followers}});
            if (number) {
                const shuffledProfiles = profiles.sort(() => Math.random() - 0.5);
                followers = shuffledProfiles.slice(0, number);
            } else {
                followers = profiles.reverse();
            }


            const result = followers.map(profile => ({
                profileId: profile.id,
                firstName: profile.firstName,
                secondName: profile.secondName,
                avatar: profile.avatar,
                city: profile.city,
            }))

            return res.status(200).json({
                members: result,
            });
        } catch (e) {
            res.status(500).json({ message: e})
        }
    }

    async subscribe(req, res) {
        try {
            const { profileId, publisher } = req.body;

            if(!profileId || !publisher) {
                return res.status(400).json({message: 'EmptyRequestBodyError: profileId and publisher required'});
            }

            const isProfile = await Profiles.findOne({id: profileId});
            if(!isProfile) {
                return res.status(400).json({message: 'NotFoundProfileError: profile with this profileId not found'});
            }

            const isPublisher = await Profiles.findOne({id: publisher});
            if(!isPublisher) {
                return res.status(400).json({message: 'NotFoundPublisherError: publisher with this profileId not found'});
            }

            const isSubscribed = isProfile.subscriptions.includes(publisher) || isPublisher.followers.includes(profileId);
            if(isSubscribed) {
                return res.status(400).json({message: 'ProfileAlreadySubscribedError: This profile already is follower this publisher'});
            }


            await Profiles.updateOne({id: publisher}, {
                $push: {followers: profileId}
            })

            await Profiles.updateOne({id: profileId}, {
                $push: {subscriptions: publisher}
            })

            return res.status(200).json({
                message: 'Success subscribed',
            });
        } catch (e) {
            res.status(500).json({ message: e})
        }
    }

    async unsubscribe(req, res) {
        try {
            const { profileId, publisher } = req.body;

            if(!profileId || !publisher) {
                return res.status(400).json({message: 'EmptyRequestBodyError: profileId and publisher required'});
            }

            const isProfile = await Profiles.findOne({id: profileId});
            if(!isProfile) {
                return res.status(400).json({message: 'NotFoundProfileError: profile with this profileId not found'});
            }

            const isPublisher = await Profiles.findOne({id: publisher});
            if(!isPublisher) {
                return res.status(400).json({message: 'NotFoundPublisherError: publisher with this profileId not found'});
            }

            await Profiles.updateOne({id: publisher}, {
                $pull: {followers: profileId}
            })

            await Profiles.updateOne({id: profileId}, {
                $pull: {subscriptions: publisher}
            })

            return res.status(200).json({
                message: 'Success subscribed',
            });
        } catch (e) {
            res.status(500).json({ message: e})
        }
    }
    async uploadImage(req, res) {
        try {
            const image = req.files.image;
            const { profileId } = req.body;

            if(!image || !profileId) {
                return res.status(400).json({message: 'EmptyDataError: file and profileId required'});
            }

            const profile = Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with this profileId not found'});
            }

            const imageMimeTypes = ['image/jpeg', 'image/png'];

            if(!imageMimeTypes.includes(image.mimetype)) {
                return res.status(400).json({message: 'InvalidFileFormat: file must have png or jpeg format'});
            }

            const newFileName = await FileService.saveImage(image, 'profiles');

            if(typeof newFileName !== 'string') {
                return res.status(500).json({message: 'ImageProcessingError: file server error'})
            }

            await Profiles.updateOne({id: profileId}, {
                $push: {images: newFileName},
            });

            return res.status(200).json({fileName: newFileName})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
    async deleteProfileImages(req, res) {
        try {
            const { profileId, arrayImages } = req.body;

            if (!profileId || !arrayImages.length) {
                return res.status(400).json({message: 'EmptyDataError: profileId and arrayImages required!'})
            }

            const profile = await Profiles.findOne({id: profileId, images: { $all: arrayImages}});
            if (!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with these profileId and images not found'});
            }

            const filteredArrayImagesAvatar = arrayImages.filter(img => img !== profile.avatar);

            await Profiles.updateOne({id: profileId, images: { $all: arrayImages}}, {
                $pullAll: {images: arrayImages},
            })

            const result = await FileService.deleteFiles(filteredArrayImagesAvatar, 'profiles');
            if(typeof result !== 'string') {
                return res.status(500).json({message: 'ServerError'})
            }

            return res.status(200).json({message: 'Deleted'})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
    async setAvatar(req, res) {
        try {
            const { profileId, image } = req.body;

            if (!profileId || !image) {
                return res.status(400).json({message: 'EmptyDataError: profileId and image required!'})
            }

            const profile = await Profiles.findOne({id: profileId, images: { $in: [image]}});
            if (!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with these profileId and image not found'});
            }

            await Profiles.updateOne({id: profileId, images: { $in: [image]}}, {
                $set: {avatar: image},
            })


            return res.status(200).json({message: 'Avatar installed'})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
    async uploadHeader(req, res) {
        try {
            const header = req.files.header;
            const { profileId } = req.body;

            if(!header || !profileId) {
                return res.status(400).json({message: 'EmptyDataError: file and profileId required'});
            }

            const profile = Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with this profileId not found'});
            }

            const imageMimeTypes = ['image/jpeg', 'image/png'];

            if(!imageMimeTypes.includes(header.mimetype)) {
                return res.status(400).json({message: 'InvalidFileFormat: file must have png or jpeg format'});
            }

            const newFileName = await FileService.saveImage(header, 'profiles');

            if(typeof newFileName !== 'string') {
                return res.status(500).json({message: 'ImageProcessingError: file server error'})
            }

            await Profiles.updateOne({id: profileId}, {
                $set: {headerImg: newFileName},
            });

            return res.status(200).json({fileName: newFileName})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
    async deleteHeader(req, res) {
        try {
            const { profileId, fileName } = req.body;

            if(!profileId) {
                return res.status(400).json({message: 'EmptyDataError: profileId required'});
            }

            const profile = Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with this profileId not found'});
            }


            const result = await FileService.deleteFiles([fileName], 'profiles');
            if(typeof result !== 'string') {
                return res.status(500).json({message: 'ServerError'})
            }

            await Profiles.updateOne({id: profileId}, {
                $unset: {headerImg: ''},
            });

            return res.status(200).json({message: 'Deleted'})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
    async uploadAvatar(req, res) {
        try {
            const avatar = req.files.avatar;
            const { profileId } = req.body;

            if(!avatar || !profileId) {
                return res.status(400).json({message: 'EmptyDataError: file and profileId required'});
            }

            const profile = Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with this profileId not found'});
            }

            const imageMimeTypes = ['image/jpeg', 'image/png'];

            if(!imageMimeTypes.includes(avatar.mimetype)) {
                return res.status(400).json({message: 'InvalidFileFormat: file must have png or jpeg format'});
            }

            const newFileName = await FileService.saveImage(avatar, 'profiles');

            if(typeof newFileName !== 'string') {
                return res.status(500).json({message: 'ImageProcessingError: file server error'})
            }

            await Profiles.updateOne({id: profileId}, {
                $set: {avatar: newFileName},
                $push: {images: newFileName},
            });

            return res.status(200).json({fileName: newFileName})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
    async deleteAvatar(req, res) {
        try {
            const { profileId } = req.body;

            if(!profileId) {
                return res.status(400).json({message: 'EmptyDataError: profileId required'});
            }

            const profile = Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with this profileId not found'});
            }

            await Profiles.updateOne({id: profileId}, {
                $unset: {avatar: ''},
            });

            return res.status(200).json({message: 'Deleted'})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
    async editProfile(req, res) {
        try {
            const { form, profileId } = req.body;

            if(!profileId || !form) {
                return res.status(400).json({message: 'EmptyDataError: profileId and form required'});
            }

            const profile = Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with this profileId not found'});
            }

            await Profiles.updateOne({id: profileId}, {
                $set: {
                    lifeStatus: form.lifeStatus,
                    familyStatus: form.familyStatus,
                    education: form.education,
                    languages: form.languages,
                    bio: form.bio,
                    city: form.city,
                },
            });

            return res.status(200).json({message: 'Edited'})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
    async addMusic(req, res) {
        try {
            const { profileId, musicId } = req.body;

            if(!profileId || !musicId) {
                return res.status(400).json({message: 'EmptyDataError: profileId and musicId required'});
            }

            const profile = Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with this profileId not found'});
            }

            await Profiles.updateOne({id: profileId}, {
                $push: {music: musicId},
            });

            return res.status(200).json({message: 'Added'})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }
    async deleteMusic(req, res) {
        try {
            const { profileId, musicId } = req.body;

            if(!profileId || !musicId) {
                return res.status(400).json({message: 'EmptyDataError: profileId and musicId required'});
            }

            const profile = Profiles.findOne({id: profileId});

            if(!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: Profile with this profileId not found'});
            }

            await Profiles.updateOne({id: profileId}, {
                $pull: {music: musicId},
            });

            return res.status(200).json({message: 'Deleted'})
        } catch (e) {
            res.status(500).json({message: e})
        }
    }

    async getSubscribeRecommendations(req, res) {
        try {
            const { profileId, number } = req.body;

            if(!profileId || !number) {
                return res.status(400).json({message: 'EmptyProfileIdsError: profileId, number required'});
            }

            const profile = await Profiles.findOne({id: profileId});
            if (!profile) {
                return res.status(400).json({message: 'NotFoundProfileError: profile with the profileId not found'})
            }


            const subscribeProfiles = await Profiles.find({id: {$nin: profile.subscriptions}});
            const subscribeRecommendations = subscribeProfiles
                .sort((a, b) => b.followers.length - a.followers.length)
                .filter((item) => item.id !== profileId)
                .slice(0, number)

            return res.status(200).json({
                members: subscribeRecommendations,
            });
        } catch (e) {
            res.status(500).json({ message: e})
        }
    }
}


export default new profilesController();
