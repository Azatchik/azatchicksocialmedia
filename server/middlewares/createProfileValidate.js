const createProfileValidate = (req, res, next) => {
    const {
        id,
        firstName,
        secondName,
        birthDay,
        birthMonth,
        birthYear,
        device,
    } = req.body;

    const isBirthData = birthYear || birthDay || birthMonth;

    if(!id || !firstName || !secondName || !isBirthData || !device) {
        return res.status(400).json({message: 'ValidateError: id and firstName and secondName and birthDate and device required!'})
    }
    const regexNames = /^[A-Za-zА-Яа-яёЁ]+$/;

    const isValidFirstName = regexNames.test(firstName);
    if(!isValidFirstName) {
        return res.status(400).json({message: 'ValidateError: firstName must contain just letters!'})
    }

    const isValidSecondName = regexNames.test(secondName);
    if(!isValidSecondName) {
        return res.status(400).json({message: 'ValidateError: secondName must contain just letters!'})
    }


    const regexBirthData = /^\d+$/;
    const isValidBirthDay = regexBirthData.test(birthDay) && birthDay.length === 2;
    const isValidBirthMonth = regexBirthData.test(birthMonth) && birthMonth.length === 2;
    const isValidBirthYear = regexBirthData.test(birthYear) && birthYear.length === 4;
    const isValidBirthData = isValidBirthDay && isValidBirthMonth && isValidBirthYear;

    if(!isValidBirthData) {
        return res.status(400).json({message: 'ValidateError: Invalid format date of birth!'})
    }

    return next();
}

export default createProfileValidate;
