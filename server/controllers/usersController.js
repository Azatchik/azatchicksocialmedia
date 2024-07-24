import * as uuid from 'uuid';
import Users from "../models/Users.js";
import { decryptData } from '../services/decryptData.js';
import { encryptData } from  '../services/encryptData.js';
import Profiles from "../models/Profiles.js";
import config from "../config.js";
import generateToken from "../services/generateToken.js";
import Notifications from "../models/Notifications.js";
import jwt from "jsonwebtoken";

// Генерируем случайный ключ
class usersController {
    async userConfirm(req, res) {
        try {
            const {id, password, email} = req.body;

            const currentUser = await Users.findOne({id: id});
            if (!currentUser) {
                return res.status(400).json({message: 'NotFoundUserConfirmIdError: User not found!'})
            }

            const isConfirmed = currentUser.password ? true : false;
            if (isConfirmed) {
                return res.status(400).json({message: 'UserPasswordAlreadyExistsError: This user already got password!'})
            }

            const hashPassword = encryptData(password);
            const hashEmail = email ? encryptData(email) : '';
            await Users.updateOne({id: id}, {
                $set: {
                    password: hashPassword,
                    email: hashEmail,
                },
            })


            const unHashedPhone = decryptData(currentUser.phone);
            return res.status(200).json({
                id: id,
                phone: unHashedPhone,
                email: email ? email : '',
            });
        } catch (e) {
            res.status(500).json({message: e});
        }
    }

    async authorization(req, res) {
        try {
            const {phone, password, device} = req.body;

            const hashPhone = encryptData(phone);
            const currentUser = await Users.findOne({phone: hashPhone});

            if (!currentUser) {
                return res.status(400).json({message: 'NotFoundUserError: User with so phone not found'});
            }

            const hashPassword = encryptData(password);
            const isValidPassword = currentUser.password === hashPassword;
            if (!isValidPassword) {
                return res.status(400).json({message: 'InvalidPasswordError: Invalid password'});
            }


            const userId = currentUser.id;

            if (currentUser.profileId) {
                const notificationId = uuid.v4();
                const newNotification = new Notifications({
                    id: notificationId,
                    type: 'authorization_notification',
                    from: 'system',
                    to: userId,
                    createdAt: Date.now(),
                    data: [device],
                    isReaded: false,
                })
                await newNotification.save();
            }


            // Удаляем токен если вход на одном и том же устройстве, а токен в базе есть
            // Так может получится например если токен пользователь потеряет, но он еще действительный
            // А не действительные удаляем, они никак не нужны, даже на других устройствах
            // Все равно войти с недействительным токеном не получится и просто чтобы не была мусорка токенов
            // Может быть еще так что и токен был потерян, и даже еще устарел, поэтому тоже устаревшие удаляем
            currentUser.authorizedDevices.map(async (token) => {
                try {
                    const authorizationData = jwt.verify(token, config.SECRET_JWT_KEY);
                    if (authorizationData.device === device) {
                        await Users.updateOne({id: userId}, {
                            $pull: {authorizedDevices: token}
                        })
                    }
                } catch (e) {
                    await Users.updateOne({id: userId}, {
                        $pull: {authorizedDevices: token}
                    })
                }
            })


            const jwtToken = generateToken(userId, device, Date.now());
            // Добавляем токен если есть профиль
            if (currentUser.profileId) {
                await Users.updateOne({id: userId}, {
                    $push: {authorizedDevices: jwtToken}
                })
            }


            const userPhone = decryptData(currentUser.phone);
            const userEmail = currentUser.email ? decryptData(currentUser.email) : '';
            const userProfileId = currentUser.profileId ?? '';
            const userAuthorizedDevices = currentUser.authorizedDevices;
            return res.status(200).json({
                id: userId,
                phone: userPhone,
                email: userEmail,
                profileId: userProfileId,
                authorizedDevices: userAuthorizedDevices,
                // Не отправляем токен если нет профиля
                token: userProfileId ? jwtToken : '',
            })
        } catch (e) {
            res.status(500).json({message: e});
        }
    }

    async updateAuthorization(req, res) {
        try {
            const { jwtToken, device } = req.body;
            if(!jwtToken || !device) {
                return res.status(400).json({message: 'ValidateError: jwtToken and device required!'});
            }

            if(typeof jwtToken !== 'string') {
                return res.status(400).json({message: 'ValidateError: jwtToken must be string!'});
            }

            try {
                const authorizationData = await jwt.verify(jwtToken, config.SECRET_JWT_KEY);

                if(authorizationData.device !== device) {
                    return res.status(400).json({message: 'SecurityBreachAttemptError: Invalid device!!!'});
                }

                const currentUser = await Users.findOne({id: authorizationData.id});

                if(!currentUser) {
                    return res.status(400).json({message: 'UserNotFoundError: user with token data not found'});
                }

                const isValidToken = currentUser.authorizedDevices.includes(jwtToken);
                if(!isValidToken) {
                    return res.status(400).json({message: 'TokenExpiredOrNotFoundError: Token is invalid or expired :('})
                }




                const userId = currentUser.id;
                // Тут уже когда все проверки прошли
                // Обновляем токен, удаляем прошлый и ставим новый, потому что он пользуется профилем снова
                const newJwtToken = await generateToken(userId, authorizationData.device, Date.now());
                await Users.updateOne({id: userId}, {
                    $push: {authorizedDevices: newJwtToken}
                })

                await Users.updateOne({id: userId}, {
                    $pull: {authorizedDevices: jwtToken},
                })



                const currentUserUpdateDevices = await Users.findOne({id: userId});
                const userPhone = decryptData(currentUser.phone);
                const userEmail = currentUser.email ? decryptData(currentUser.email) : '';
                const profileId = currentUser.profileId;
                const authorizedDevices = currentUserUpdateDevices.authorizedDevices;


                return res.status(200).json({
                    id: userId,
                    phone: userPhone,
                    email: userEmail,
                    profileId: profileId,
                    authorizedDevices: authorizedDevices,
                    newJwtToken: newJwtToken,
                })
            } catch (e) {
                try {
                    await jwt.verify(jwtToken, config.SECRET_JWT_KEY);
                } catch (e) {
                    await Users.updateOne({authorizedDevices: {$in: jwtToken}}, {
                        $pull: {authorizedDevices: jwtToken},
                    })
                    return res.status(400).json({message: 'TokenExpiredOrNotFoundError: Token is invalid or expired :('});
                }
            }
        } catch (e) {
            res.status(500).json({message: e});
        }
    }
}


export default new usersController();
