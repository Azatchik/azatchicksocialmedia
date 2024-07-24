const authorizationValidate = (req, res, next) => {
    const {phone, password, device} = req.body;

    if(!phone || !password || !device) {
        return res.status(400).json({message: 'ValidateError: phone and password and device required!'})
    }

    const isValidPhone = /^\d+$/.test(phone)
    if(!isValidPhone) {
        return res.status(400).json({message: 'ValidateError: Searched bad symbols, must just numbers!'})
    }

    const isCurrentPhoneLength = phone.length;
    if(isCurrentPhoneLength > 15 || isCurrentPhoneLength < 10) {
        return res.status(400).json({message: 'ValidateError: Invalid phone number length!'})
    }

    return next();
}

export default authorizationValidate;
