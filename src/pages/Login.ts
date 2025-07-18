
import { onUsernameError, onPasswordError } from "../utils/validation.js";
import { LSKEY, save } from "../services/data.js";

const inputUsername = document.getElementById('username') as HTMLInputElement;
const inputPassword = document.getElementById('password') as HTMLInputElement;
const inputToggle = document.querySelector('.toggle-password') as HTMLInputElement;
//const checkRemember = document.getElementById('remember') as HTMLInputElement;
const buttonSubmit = document.querySelector('button[type="submit"]') as HTMLInputElement;

const errorUsername = document.getElementById('username-error-message') as HTMLParagraphElement;
const errorPassword = document.getElementById('password-error-message') as HTMLParagraphElement;

inputToggle.addEventListener("click", togglePassword);

buttonSubmit.addEventListener("click", doLogin);

function clearLoginErrors(): void {
    const errorBoxes = document.querySelectorAll(".error-message");
    errorBoxes.forEach(tmp => {
        const box = tmp as HTMLElement;
        box.style.display = "none";
        box.textContent = "";
    });
}

function togglePassword(): void {
    switch (inputPassword.type) {
        case "password":
            inputPassword.type = "text";
            break;
        default:
            inputPassword.type = "password";
            break;
    }
}

function doLogin(event: Event): void {
    event.preventDefault();
    clearLoginErrors();
    let errors = 0;

    onUsernameError(inputUsername.value, (message: string) => {
        errorUsername.textContent = message;
        errorUsername.style.display = "block";
        errors++;
    });

    onPasswordError(inputPassword.value, (message: string) => {
        errorPassword.textContent = message;
        errorPassword.style.display = "block";
        errors++;
    });

    if (errors <= 0) {
        save(LSKEY.USERNAME, inputUsername.value);
        const formLogin = inputUsername.parentElement as HTMLFormElement;
        formLogin.submit();
    }
}