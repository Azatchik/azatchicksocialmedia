export enum ResetPasswordServerErrorTypes {
    // Ошибки после запроса на сервер
    NOT_FOUND_RESET_PASSWORD_USER_ERROR = 'NotFoundResetPasswordUserError',
    TOO_MANY_REQUESTS_ERROR = 'TooManyRequestsError',
    INVALID_CODE_ERROR = 'InvalidCodeError',
    NOT_FOUND_USER_CONFIRM_ID_ERROR = 'NotFoundUserConfirmIdError',
    NOT_FOUND_VERIFY_CODE_TOKEN_ERROR = 'NotFoundVerifyCodeTokenError',
}
