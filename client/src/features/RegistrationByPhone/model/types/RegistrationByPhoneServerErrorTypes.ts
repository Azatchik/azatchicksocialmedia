export enum RegistrationByPhoneServerErrorTypes {
    // Ошибки после запроса на сервер
    USER_ALREADY_EXISTS_ERROR = 'UserAlreadyExistsError',
    TOO_MANY_REQUESTS_ERROR = 'TooManyRequestsError',
    INVALID_CODE_ERROR = 'InvalidCodeError',
    NOT_FOUND_USER_CONFIRM_ID_ERROR = 'NotFoundUserConfirmIdError',
    NOT_FOUND_VERIFY_CODE_TOKEN_ERROR = 'NotFoundVerifyCodeTokenError',
}
