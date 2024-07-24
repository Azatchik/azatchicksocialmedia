const getMethodsResetValidate = (req, res, next) => {
    const {phone} = req.body;

    if(!phone) {
        return res.status(400).json({message: 'ValidateError: phone required'});
    }

    return next();
}

export default getMethodsResetValidate;
