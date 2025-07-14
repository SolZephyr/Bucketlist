// här är det bara level-up!
import Dream from "../models/Dream.js";
import { getUsername, setUsername, getThemes, setThemes, getDreams, setDreams } from "../services/data.js";
import { ThemeListItem } from "../components/ThemeListItem.js";
import { onUsernameError, onDreamThemeError } from "../utils/validation.js";

let username: string;

const inputUsername = document.querySelector(".change-name #name-input") as HTMLInputElement;
const buttonUsername = document.querySelector('.change-name button') as HTMLButtonElement;

const listThemes = document.getElementById('theme-list') as HTMLButtonElement;
const inputTheme = document.querySelector(".add-theme #theme-input") as HTMLInputElement;
const buttonTheme = document.querySelector('.add-theme button') as HTMLButtonElement;

const buttonLogout = document.querySelector('button.logout') as HTMLButtonElement;

initPage();

buttonUsername.addEventListener("click", updateUsername);
buttonLogout.addEventListener("click", logOut);
buttonTheme.addEventListener("click", addTheme);
listThemes.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    switch (target.tagName) {
        case "IMG":
            removeTheme(target);
            break;
    }
});

function initPage(): void {
    const checkUser = getUsername();
    if (!checkUser) {
        window.location.replace("login.html");
        return;
    }
    username = checkUser;
    renderPage();
}

function renderPage(): void {
    inputUsername.value = username;
    listThemes.textContent = "";

    const themes = getThemes();
    themes.forEach((item) => {
        const li = ThemeListItem(item);
        listThemes.appendChild(li);
    });
}

// Update username of current user
function updateUsername(): void {
    let error = 0;
    onUsernameError(inputUsername.value, function (message: string) {
        window.alert(message);
        error++;
    });

    if (error > 0) {
        return;
    }
    setUsername(inputUsername.value.trim());
}

// Add a theme option
function addTheme(): void {
    let error = 0;
    onDreamThemeError(inputTheme.value, function (message: string) {
        window.alert(message);
        error++;
    });

    if (error > 0) {
        return;
    }

    const themes = getThemes();
    themes.push(inputTheme.value.trim());
    setThemes(themes);

    inputTheme.value = "";
    renderPage();
}

// Remove a theme option
function removeTheme(target: HTMLElement): void {
    const confirm = window.confirm("Ta bort drömtema?");
    if (!confirm)
        return;

    const item = target as HTMLElement;
    const val = item.closest("li")?.dataset.id;

    if (val === undefined)
        return;

    const list = getThemes();
    const index = list.findIndex(d => d === val);
    if (index < 0)
        return;

    list.splice(index, 1);

    setThemes(list);

    refreshDreams();
    renderPage();
}

function refreshDreams(): void {
    const dreams = getDreams();
    const themes = getThemes();

    for (const key in dreams) {
        let dream = dreams[key];
        const check = themes.findIndex(t => t == dream.theme);
        if (check < 0) {
            dream.theme = "-";
            dreams[key] = dream;
        }
    }
    setDreams(dreams);
}

// Logout the current user
function logOut(): void {
    localStorage.removeItem("user");
    window.location.replace('login.html');
};