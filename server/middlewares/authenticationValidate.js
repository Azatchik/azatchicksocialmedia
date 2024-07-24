const authenticationValidate = (req, res, next) => {
    const pathName = req.path;

    if(pathName.includes('/authenticate')) {
        const {phone} = req.body;
        if(!phone) {
            return res.status(400).json({message: 'ValidateEmptyPhoneError: Phone required!'})
        }
        const isValidPhone = /^\d+$/.test(phone)
        if(!isValidPhone) {
            return res.status(400).json({message: 'ValidatePhoneSymbolsError: Searched invalid symbols, must just numbers!'})
        }
        const isCurrentPhoneLength = phone.length;
        if(isCurrentPhoneLength > 15 || isCurrentPhoneLength < 10) {
            return res.status(400).json({message: 'ValidatePhoneLengthError: Invalid phone number length!'})
        }
        return next();
    } else if(pathName.includes('/verify')) {
        const { token, code } = req.body;
        if(!token || !code) {
            return res.status(400).json({message: 'ValidateError: Token and code required!'})
        }
        const isValidCode = /^\d+$/.test(code)
        if(!isValidCode) {
            return res.status(400).json({message: 'ValidateCodeSymbolsError: Code must have just numbers!'})
        }
        const isCurrentCodeLength = code.length;
        if(isCurrentCodeLength !== 6) {
            return res.status(400).json({message: 'ValidateCodeLengthError: The code must consist of 6 digits!'})
        }
        return next();
    }

}

export default authenticationValidate;
