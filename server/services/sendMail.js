import nodemailer from 'nodemailer';

const sendMail = (address, code) => {
// Создайте транспорт с данными для входа в Gmail
    let transporter = nodemailer.createTransport({
        host: 'smpt.mail.ru',
        auth: {
            user: 'baraev21@inbox.ru', // Ваш адрес Gmail
            pass: 'XjQ92hkxT04VVyQmvD0w' // Ваш пароль Gmail
        },
        port: 25,
    });

// Определите параметры письма
    let mailOptions = {
        from: 'baraev21@inbox.ru', // От кого
        to: address, // Кому
        subject: 'AZATCHIK_SOCIAL_MEDIA', // Тема письма
        html: `<div>Ваш код для восстановления пароля: <b>${code}</b></div>` // HTML тело письма
    };

// Отправьте письмо
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default sendMail;
