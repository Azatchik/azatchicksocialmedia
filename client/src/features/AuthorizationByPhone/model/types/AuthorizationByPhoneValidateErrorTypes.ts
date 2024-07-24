export enum AuthorizationByPhoneValidateErrorTypes {
    // Ошибки до запроса на сервер

    // номер
    EMPTY_PHONE_ERROR = 'EMPTY_PHONE_ERROR',
    FORMAT_PHONE_ERROR = 'FORMAT_PHONE_ERROR',

    // пароль
    EMPTY_PASSWORD_ERROR = 'EMPTY_PASSWORD_ERROR',
}
