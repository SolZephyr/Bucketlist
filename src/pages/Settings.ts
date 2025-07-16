// här är det bara level-up!
import Dream from "../models/Dream.js";
import { LSKEY, clear, load, save } from "../services/data.js";
import { ThemeListItem } from "../components/ThemeListItem.js";
import { onUsernameError, onDreamThemeError } from "../utils/validation.js";

let username: string;
let dreams: Dream[] = [];
let themes: string[] = [];

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
    load(LSKEY.USERNAME).then((data) => {
        username = data as string;
        inputUsername.value = username;

        load(LSKEY.THEMES).then((data) => {
            themes = data as string[];
            renderThemes();
        });
        load(LSKEY.DREAMS).then((data) => {
            dreams = data as Dream[];
        });
    }, () => {
        window.location.replace("login.html");
    });
}

function renderThemes(): void {
    listThemes.textContent = "";
    themes.forEach((item) => {
        const li = ThemeListItem(item);
        listThemes.appendChild(li);
    });
    if (themes.length > 0)
        return;
    const li = document.createElement("li");
    li.textContent = "Listan är tom...";
    listThemes.appendChild(li);
}

// Update username of current user
function updateUsername(): void {
    let error = 0;
    onUsernameError(inputUsername.value, function (message: string) {
        window.alert(message);
        error++;
    });
    if (error <= 0) {
        save(LSKEY.USERNAME, inputUsername.value.trim());
    }
}

// Add a theme option
function addTheme(): void {
    let error = 0;
    onDreamThemeError(inputTheme.value, function (message: string) {
        window.alert(message);
        error++;
    });

    if (error <= 0) {
        themes.push(inputTheme.value.trim());
        save(LSKEY.THEMES, themes).then((data) => {
            themes = data as string[];
            inputTheme.value = "";
            renderThemes();
        }, () => console.error("Failed to add theme"));
    }
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

    const index = themes.findIndex(d => d === val);
    if (index >= 0) {
        themes.splice(index, 1);
        save(LSKEY.THEMES, themes).then((data) => {
            themes = data as string[];
            renderThemes();
            refreshDreams();
        }, () => console.error("Failed to remove theme"));
    }
}

function refreshDreams(): void {
    let changed = false;
    for (const key in dreams) {
        let dream = dreams[key];
        const check = themes.findIndex(t => t == dream.theme);
        if (check < 0) {
            dream.theme = "-";
            dreams[key] = dream;
        }
    }
    if (changed) {
        save(LSKEY.DREAMS, dreams);
    }
}

// Logout the current user
function logOut(): void {
    clear(LSKEY.USERNAME);
    window.location.replace('login.html');
};