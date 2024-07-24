const resetPasswordVerifyValidate = (req, res, next) => {
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

export default resetPasswordVerifyValidate;
