import Users from "../models/Users.js";
import {encryptData} from "../services/encryptData.js";
import {decryptData} from "../services/decryptData.js";
import Resets from "../models/Resets.js";
import * as uuid from "uuid";
import generateCode from "../services/generateCode.js";
import sendMail from "../services/sendMail.js";
import Authentications from "../models/Authentications.js";
import Notifications from "../models/Notifications.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import generateToken from "../services/generateToken.js";

class resetsController {
    async getMethods(req, res) {
        try {
            const {phone} = req.body;

            const hashPhone = encryptData(phone)
            const user = await Users.findOne({phone: hashPhone})

            if(!user) {
                return res.status(400).json({
                    message: 'NotFoundResetPasswordUserError: user with phone not found',
                })
            }

            if(!user.password) {
                return res.status(400).json({
                    message: 'NotFoundResetPasswordUserError: user with phone not found',
                })
            }

            const email = user.email ? [decryptData(user.email)] : [];

            return res.status(200).json({
                methods: [phone, ...email],
            })
        } catch (e) {
            res.status(500).json({message: e});
        }
    }

    async getCode(req, res) {
        try {
            const {method, phone} = req.body;
            if(!method || !phone) {
                return res.status(400).json('ValidateError: method and phone required!');
            }
            const isPhone = /^\d+$/.test(method);
            const isEmail = !isPhone;

            const user = isEmail
                ? Users.findOne({phone: phone, email: method})
                : Users.findOne({phone: method})

            if(!user) {
                return res.status(400).json('NotFoundResetUserError: User not found with so phone or email!');
            }

            if(isEmail) {
                const token = uuid.v4();
                const code = generateCode();
                const hashCode = encryptData(code);

                const reset = await Resets.findOne({userPhone: phone, method: method})
                const attempts = reset ? reset.attempts : 0;

                if(attempts === 4) {
                    return res.status(400).json({message: 'TooManyRequestsError: Spam authentications again!'})
                }

                // Если выходил и отправлял код 3 раза заново, когда еще не прошло 2 минуты, для следующей отправки
                if(attempts === 3) {
                    // Тут меняется токен для того чтобы последний сеттаймаут не удалил заявку за 2 минуты
                    // И выполнился со старым токеном, потому что штраф за спам должен быть больше, 5 минут
                    await Resets.updateOne({ userPhone: phone, method: method },
                        {
                            $set: {token: token, code: hashCode},
                            $inc: {attempts: 1}
                        }
                    )
                    setTimeout(async () => {
                        try {
                            await Resets.deleteOne({token: token})
                        } catch (e) {
                            console.log('Skip delete previous reset, have been created a new')
                        }
                    }, 60000 * 15)
                    return res.status(400).json({message: 'TooManyRequestsError: Spam authentications!'})
                }


                // Если уже была заявка создаем обновляем id заявки и смс код и добавляем попытки
                if(attempts) {
                    await Resets.updateOne({ userPhone: phone, method: method },
                        {
                            $set: {token: token, code: hashCode},
                            $inc: {attempts: 1}
                        }
                    )

                    setTimeout(async () => {
                        try {
                            await Resets.deleteOne({token: token})
                        } catch (e) {
                            console.log('Skip delete previous authentication, have been created a new')
                        }
                    }, 60000 * 5) // Тут тоже Удаляем аутентификацию через 5 минуты время ожидания истекает на подтерждение

                    sendMail(method, code);
                    return res.status(200).json({
                        token: token
                    });
                }




                // Если первый раз создаем заявку с кодом
                const newReset = new Resets({
                    token: token,
                    code: hashCode,
                    attempts: 1,
                    method: method,
                    userPhone: phone,
                });
                await newReset.save();

                setTimeout(async () => {
                    try {
                        await Resets.deleteOne({token: token})
                    } catch (e) {
                        console.log('Skip delete previous reset, have been created a new')
                    }
                }, 60000 * 5) // Удаляем аутентификацию через 5 минуты время ожидания истекает на подтерждение
                // Если даже пользователь выйдет и отправит новую заявку, id и code обновится
                // И если что, этот сеттаймаут не удалит сразу новую заявку, он попытается удалить заявку с предыдущим id

                console.log('Отправился код на почту')
                sendMail(method, code); // Отправляем код на почту
                return res.status(200).json({
                    token: token,
                })
            }




            // По телефону код
            if(isPhone) {
                const token = uuid.v4();
                const code = generateCode();
                const hashCode = encryptData(code);

                const reset = await Resets.findOne({userPhone: phone, method: method})
                const attempts = reset ? reset.attempts : 0;

                if(attempts === 4) {
                    return res.status(400).json({message: 'TooManyRequestsError: Spam authentications again!'})
                }

                // Если выходил и отправлял код 3 раза заново, когда еще не прошло 2 минуты, для следующей отправки
                if(attempts === 3) {
                    // Тут меняется токен для того чтобы последний сеттаймаут не удалил заявку за 2 минуты
                    // И выполнился со старым токеном, потому что штраф за спам должен быть больше, 5 минут
                    await Resets.updateOne({userPhone: phone,  method: method },
                        {
                            $set: {token: token, code: hashCode},
                            $inc: {attempts: 1}
                        }
                    )
                    setTimeout(async () => {
                        try {
                            await Resets.deleteOne({token: token})
                        } catch (e) {
                            console.log('Skip delete previous reset, have been created a new')
                        }
                    }, 60000 * 15)
                    return res.status(400).json({message: 'TooManyRequestsError: Spam authentications!'})
                }


                // Если уже была заявка создаем обновляем id заявки и смс код и добавляем попытки
                if(attempts) {
                    await Resets.updateOne({userPhone: phone, method: method },
                        {
                            $set: {token: token, code: hashCode},
                            $inc: {attempts: 1}
                        }
                    )

                    setTimeout(async () => {
                        try {
                            await Resets.deleteOne({token: token})
                        } catch (e) {
                            console.log('Skip delete previous authentication, have been created a new')
                        }
                    }, 60000 * 5) // Тут тоже Удаляем аутентификацию через 5 минуты время ожидания истекает на подтерждение

                    return res.status(200).json({
                        token: token,
                        code: code,
                    });
                }




                // Если первый раз создаем заявку с кодом
                const newReset = new Resets({
                    token: token,
                    code: hashCode,
                    attempts: 1,
                    method: method,
                    userPhone: phone
                });
                await newReset.save();

                setTimeout(async () => {
                    try {
                        await Resets.deleteOne({token: token})
                    } catch (e) {
                        console.log('Skip delete previous reset, have been created a new')
                    }
                }, 60000 * 5) // Удаляем аутентификацию через 5 минуты время ожидания истекает на подтерждение
                // Если даже пользователь выйдет и отправит новую заявку, id и code обновится
                // И если что, этот сеттаймаут не удалит сразу новую заявку, он попытается удалить заявку с предыдущим id


                return res.status(200).json({
                    token: token,
                    code: code,
                })
            }

        } catch (e) {
            res.status(500).json({message: e});
        }
    }
    async resetVerify(req, res) {
        try {
            const { token, code } =  req.body;

            const resetSession = await Resets.findOne({token: token})
            if(!resetSession) {
                return res.status(400).json({message: 'NotFoundVerifyCodeTokenError: Reset with the token not found!'});
            }

            const currentCode = decryptData(resetSession.code);
            if(currentCode !== code) {
                return res.status(400).json({message: 'InvalidCodeError: Invalid code!'});
            }

            const hashPhone = encryptData(resetSession.userPhone);
            const user = await Users.findOne({phone: hashPhone});
            const userId = user.id;

            await Resets.deleteOne({token: token});
            return res.status(200).json({
                userId: userId,
            })
        } catch (e) {
            res.status(500).json({message: e});
        }
    }
    async setPassword(req, res) {
        try {
            const {id, password, device} = req.body;

            const currentUser = await Users.findOne({id: id});

            if (!currentUser) {
                return res.status(400).json({message: 'NotFoundUserError: User with so id not found'});
            }

            const notificationSetPasswordId = uuid.v4();
            const newSetPasswordNotification = new Notifications({
                id: notificationSetPasswordId,
                type: 'set_password_notification',
                from: 'system',
                to: id,
                createdAt: Date.now(),
                data: [device],
                isReaded: false,
            })
            await newSetPasswordNotification.save();


            if (currentUser.profileId) {
                const notificationAuthId = uuid.v4();
                const newAuthNotification = new Notifications({
                    id: notificationAuthId,
                    type: 'authorization_notification',
                    from: 'system',
                    to: id,
                    createdAt: Date.now(),
                    data: [device],
                    isReaded: false,
                })
                await newAuthNotification.save();
            }



            // Меняем пароль
            const hashPassword = encryptData(password);
            await Users.updateOne({id: id}, {
                $set: {password: hashPassword}
            })
            // Удаляем все авторизованные устройства
            await Users.updateOne({id: id}, {
                $set: {authorizedDevices: []}
            })
            const jwtToken = generateToken(id, device, Date.now());
            // Добавляем токен если есть профиль
            if (currentUser.profileId) {
                await Users.updateOne({id: id}, {
                    $push: {authorizedDevices: jwtToken}
                })
            }

            const updateCurrentUser = await Users.findOne({id: id});

            const userPhone = decryptData(updateCurrentUser.phone);
            const userEmail = updateCurrentUser.email ? decryptData(updateCurrentUser.email) : '';
            const userProfileId = updateCurrentUser.profileId ?? '';
            const userAuthorizedDevices = updateCurrentUser.authorizedDevices;
            return res.status(200).json({
                id: id,
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
}


export default new resetsController();
