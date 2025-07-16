
enum validateError {
    USERNAME_EMPTY = "Vänligen ange ditt användarnamn.",
    USERNAME_INVALID = "Användarnamnet är ogiltigt.",
    PASSWORD_EMPTY = "Vänligen ange ditt lösenord.",
    PASSWORD_INVALID = "Lösenordet är ogiltigt.",
    PASSWORD_LENGTH = "Lösenordet måste innehålla minst 4 tecken.",
    DREAMNAME_LENGTH = "Vänligen ange vad du drömmer om.",
    DREAMTHEME_LENGTH = "Vänligen välj ett tema för din dröm."
}

export function onUsernameError(username: string, callback: Function): void {
    if (username.trim().length <= 0) {
        return callback(validateError.USERNAME_EMPTY);
    }
}

export function onPasswordError(password: string, callback: Function): void {
    // trim(); space appropriate char for password?
    if (password.length <= 0) {
        return callback(validateError.PASSWORD_EMPTY);
    }
    if (password.length < 4) {
        return callback(validateError.PASSWORD_LENGTH);
    }
}

export function onDreamNameError(name: string, callback: Function): void {
    if (name.trim().length <= 0) {
        return callback(validateError.DREAMNAME_LENGTH);
    }
}

export function onDreamThemeError(theme: string, callback: Function): void {
    if (theme.trim().length <= 0) {
        return callback(validateError.DREAMTHEME_LENGTH);
    }
}