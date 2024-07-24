import * as uuid from 'uuid';
import Authentications from '../models/Authentications.js';
import Users from '../models/Users.js';
import { decryptData } from '../services/decryptData.js';
import { encryptData } from  '../services/encryptData.js';
import generateCode from  '../services/generateCode.js';
import config from "../config.js";

// Генерируем случайный ключ
class authenticationsController {
    async createAuthentication(req, res) {
        try {
            const {phone} = req.body;

            const verificationCode = generateCode(); // Генерация обычного смс кода 6 знач
            const token = uuid.v4(); // Генерация уникального token аутентификации
            const hashCode = encryptData(verificationCode); // Хэширование смс кода
            const hashPhone = encryptData(phone); // Хэширование номера телефона
            let spamAgainConfirm = false;

            const isNewUser = await Users.findOne({phone: hashPhone});
            if(isNewUser) {
                if(isNewUser.password) {
                    return res.status(400).json({message: 'UserAlreadyExistsError: User with this phone is registrated!'})
                }
                else if(!isNewUser.password) {
                    await Users.deleteOne({phone: hashPhone})
                    spamAgainConfirm = true;
                }
            }

            const authentication = await Authentications.findOne({phone: hashPhone})
            const attempts = authentication ? authentication.attempts : 0;

            if(attempts === 4) {
                return res.status(400).json({message: 'TooManyRequestsError: Spam authentications again!'})
            }

            // Если выходил и отправлял код 3 раза заново, когда еще не прошло 2 минуты, для следующей отправки
            if(attempts === 3) {
                // Тут меняется токен для того чтобы последний сеттаймаут не удалил заявку за 2 минуты
                // И выполнился со старым токеном, потому что штраф за спам должен быть больше, 5 минут
                await Authentications.updateOne({ phone: hashPhone },
                    {
                        $set: {token: token, code: hashCode},
                        $inc: {attempts: 1}
                    }
                )
                setTimeout(async () => {
                    try {
                        await Authentications.deleteOne({phone: hashPhone})
                    } catch (e) {
                        console.log('Skip delete previous authentication, have been created a new')
                    }
                }, 60000 * 15)
                return res.status(400).json({message: 'TooManyRequestsError: Spam authentications!'})
            }


            // Если уже была заявка создаем обновляем id заявки и смс код и добавляем попытки
            if(attempts) {
                await Authentications.updateOne({ phone: hashPhone },
                    {
                        $set: {token: token, code: hashCode},
                        $inc: {attempts: 1}
                    }
                )

                setTimeout(async () => {
                    try {
                        await Authentications.deleteOne({token: token})
                    } catch (e) {
                        console.log('Skip delete previous authentication, have been created a new')
                    }
                }, 60000 * 5) // Тут тоже Удаляем аутентификацию через 5 минуты время ожидания истекает на подтерждение

                return res.status(200).json({
                    token: token,
                    code: verificationCode, // Так как смс никуда не отправляем просто кидаем клиенту чтобы зайти
                });
            }




            // Если первый раз создаем заявку с кодом
            const newAuthentication = new Authentications({
                token: token,
                phone: hashPhone,
                code: hashCode,
                attempts: spamAgainConfirm ? 3 : 1,
            }) // Создание аутентификации в бд
            await newAuthentication.save(); // Отправляем
            spamAgainConfirm = false;

            setTimeout(async () => {
                try {
                    await Authentications.deleteOne({token: token})
                } catch (e) {
                    console.log('Skip delete previous authentication, have been created a new')
                }
            }, 60000 * 5) // Удаляем аутентификацию через 5 минуты время ожидания истекает на подтерждение
            // Если даже пользователь выйдет и отправит новую заявку, id и code обновится
            // И если что, этот сеттаймаут не удалит сразу новую заявку, он попытается удалить заявку с предыдущим id

            return res.status(200).json({
                token: token,
                code: verificationCode, // Так как смс никуда не отправляем просто кидаем клиенту чтобы зайти
            })
        } catch (e) {
            return res.status(500).json({message: e});
        }
    }

    async verifyAuthentication(req, res) {
        try {
            const { token, code } =  req.body;

            const authenticationSession = await Authentications.findOne({token: token})
            if(!authenticationSession) {
                return res.status(400).json({message: 'NotFoundVerifyCodeTokenError: Authentication with the token not found!'});
            }

            const currentCode = decryptData(authenticationSession.code);
            if(currentCode !== code) {
                return res.status(400).json({message: 'InvalidCodeError: Invalid code!'});
            }



            // Создание пользователя
            const id = uuid.v4();
            const phone = authenticationSession.phone;

            const newUser = new Users({
                id: id,
                phone: phone,
            });
            await newUser.save();
            await Authentications.deleteOne({token: token});


            setTimeout(async () => {
                try {
                    const user = await Users.findOne({id: id});
                    if(!user.password) {
                       return await Users.deleteOne({id: id})
                    }
                } catch (e) {
                    console.log('Error delete user without password for 5 minute');
                }
            }, 60000 * 5)

            return res.status(200).json({
                userId: id,
            })
        } catch (e) {
            res.status(500).json({message: e});
        }
    }
}

export default new authenticationsController();
