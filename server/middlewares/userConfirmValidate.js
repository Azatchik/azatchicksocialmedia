const userConfirmValidate = (req, res, next) => {
    const { id, password, email } = req.body;

    if(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isValidEmail = regex.test(email);
        if(!isValidEmail) {
            return res.status(400).json({message: 'ValidateEmailFormatError: Invalid format email address!'})
        }
    }

    if(!id || !password) {
        return res.status(400).json({message: 'ValidateEmptyPasswordError: Id and password required!'})
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

export default userConfirmValidate;
