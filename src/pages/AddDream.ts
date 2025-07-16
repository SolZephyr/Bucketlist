import { onDreamNameError, onDreamThemeError } from "../utils/validation.js";
import { LSKEY, load, save } from "../services/data.js";
import Dream from "../models/Dream.js";
import { ThemeListDefaultOption, ThemeListOption } from "../components/ThemeListItem.js";

let username: string;
let themes: string[] = [];
let dreams: Dream[] = [];

const viewUsername = document.getElementById('user-name') as HTMLElement;
//const viewAvatar = document.querySelector("figure") as HTMLElement;

const inputDream = document.getElementById('dream') as HTMLInputElement;
const selectTheme = document.getElementById('dream-select') as HTMLSelectElement;
const buttonSubmit = document.querySelector('button[type="submit"]') as HTMLSelectElement;

const errorDream = document.getElementById('dream-error-message') as HTMLParagraphElement;
const errorTheme = document.getElementById('theme-error-message') as HTMLParagraphElement;

buttonSubmit.addEventListener("click", addDream);

initPage();

function initPage(): void {
    load(LSKEY.USERNAME).then((data) => {
        username = data as string;
        viewUsername.textContent = username;
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
    selectTheme.textContent = "";
    selectTheme.appendChild(ThemeListDefaultOption("-- Välj ett tema --"));
    themes.forEach(item => {
        selectTheme.appendChild(ThemeListOption(item));
    });
}

function clearFormErrors(): void {
    const errorBoxes = document.querySelectorAll(".error-message");
    errorBoxes.forEach(tmp => {
        const box = tmp as HTMLElement;
        box.style.display = "none";
        box.textContent = "";
    });
}

function addDream(event: Event): void {
    event.preventDefault();
    clearFormErrors();
    let errors = 0;

    onDreamNameError(inputDream.value, (message: string) => {
        errorDream.textContent = message;
        errorDream.style.display = "block";
        errors++;
    });

    onDreamThemeError(selectTheme.value, (message: string) => {
        errorTheme.textContent = message;
        errorTheme.style.display = "block";
        errors++;
    });

    if (errors <= 0) {
        let newId = 0;
        dreams.forEach(item => {
            newId = Math.max(newId, item.id);
        });
        newId++;

        const newDream: Dream = {
            id: newId,
            name: inputDream.value.trim(),
            theme: selectTheme.value.trim(),
            checked: false
        }
        dreams.push(newDream);

        save(LSKEY.DREAMS, dreams).then((data) => {
            dreams = data as Dream[];
        }, () => console.log("Failed to add dream"));

        window.location.replace("dashboard.html");
    }
}