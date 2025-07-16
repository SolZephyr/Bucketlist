
import { LSKEY, load, save } from "../services/data.js";
import DreamListItem from "../components/DreamListItem.js";
import Dream from "../models/Dream.js";

let username: string;
let dreams: Dream[] = [];

const viewUsername = document.getElementById("user-name") as HTMLElement;
//const viewAvatar = document.querySelector("figure") as HTMLElement;

const listDreams = document.querySelector(".dream-list") as HTMLUListElement;

initPage();

listDreams.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    switch (target.tagName) {
        case "INPUT":
            markDream(target);
            break;
        case "BUTTON":
            removeDream(target);
            break;
    }
});

function initPage(): void {
    load(LSKEY.USERNAME).then((data) => {
        username = data as string;
        viewUsername.textContent = username;

        load(LSKEY.DREAMS).then((data) => {
            dreams = data as Dream[];
            renderDreams();
        });
    }, () => {
        window.location.replace("login.html");
    });
}

function renderDreams(): void {
    listDreams.textContent = "";
    dreams.forEach((item) => listDreams.appendChild(DreamListItem(item)));
    if (dreams.length > 0)
        return;
    const li = document.createElement("li");
    li.textContent = "Listan är tom...";
    listDreams.appendChild(li);
}

function markDream(target: HTMLElement): void {
    const input = target as HTMLInputElement;
    const val = input.closest("li")?.dataset.id;
    if (val === undefined || isNaN(parseInt(val)))
        return;

    const index = dreams.findIndex(d => d.id === parseInt(val));
    if (index < 0)
        return;
    let dream = dreams[index];
    dream.checked = input.checked;
    dreams[index] = dream;

    save(LSKEY.DREAMS, dreams).then((data) => {
        dreams = data as Dream[];
    }, () => console.log("Failed to mark dream"));
}

function removeDream(target: HTMLElement): void {
    const confirm = window.confirm("Ta bort dröm?");
    if (!confirm)
        return;

    const button = target as HTMLButtonElement;
    const val = button.closest("li")?.dataset.id;
    if (val === undefined || isNaN(parseInt(val)))
        return;

    const index = dreams.findIndex(d => d.id === parseInt(val));
    if (index < 0)
        return;

    dreams.splice(index, 1);
    save(LSKEY.DREAMS, dreams).then((data) => {
        dreams = data as Dream[];
        renderDreams();
    }, () => console.log("Failed to remove dream"));
}