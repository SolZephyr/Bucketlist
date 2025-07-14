
import { getUsername, getDreams, setDreams } from "../services/data.js";
import DreamListItem from "../components/DreamListItem.js";

let username: string;

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
    const checkUser = getUsername();
    if (!checkUser) {
        window.location.replace("login.html");
        return;
    }
    username = checkUser;
    renderPage();
}


function renderPage(): void {
    viewUsername.textContent = username;

    listDreams.textContent = "";
    const list = getDreams();
    list.forEach((item) => {
        const li = DreamListItem(item);
        listDreams.appendChild(li);
    });
    if (list.length <= 0) {
        const li = document.createElement("li");
        li.textContent = "Listan är tom...";
        listDreams.appendChild(li);
    }
}

function markDream(target: HTMLElement): void {
    const input = target as HTMLInputElement;
    const val = input.closest("li")?.dataset.id;
    if (val === undefined || isNaN(parseInt(val)))
        return;

    const list = getDreams();
    const index = list.findIndex(d => d.id === parseInt(val));
    if (index < 0)
        return;

    let dream = list[index];
    dream.checked = input.checked;
    list[index] = dream;
    setDreams(list);
}

function removeDream(target: HTMLElement): void {
    const confirm = window.confirm("Ta bort dröm?");
    if (!confirm)
        return;

    const button = target as HTMLButtonElement;
    const val = button.closest("li")?.dataset.id;
    if (val === undefined || isNaN(parseInt(val)))
        return;

    const list = getDreams();
    const index = list.findIndex(d => d.id === parseInt(val));
    if (index < 0)
        return;

    list.splice(index, 1);
    setDreams(list);
    renderPage();
}