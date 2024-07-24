const resetPasswordSetPasswordValidate = (req, res, next) => {
    const {id, password, device} = req.body;

    if(!id || !password || !device) {
        return res.status(400).json({message: 'ValidateError: Id and password and device required!'})
    }

    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    const isValidPassword = regex.test(password);
    if(!isValidPassword) {
        return res.status(400).json({message: 'ValidatePasswordFormatError: Invalid password format!'})
    }
    const isValidPasswordLength = password.length > 6 && password.length < 50;
    if(!isValidPasswordLength) {
        return res.status(400).json({message: 'ValidatePasswordLengthError: Invalid password length!'})
    }

    return next();
}

export default resetPasswordSetPasswordValidate;
