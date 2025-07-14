
import Dream from "../models/Dream.js";

const debug = false;

let name = "NAMN";
const themes = ["Teknikdrömmar", "Vardagsdrömmar", "Husdrömmar", "Sportdrömmar", "Resdrömmar"];
const dreams: Dream[] = [
    {
        id: 1,
        name: "Lära mig HTML/CSS",
        theme: "teknikdrömmar",
        checked: true
    },
    {
        id: 2,
        name: "Lära mig TypeScript",
        theme: "teknikdrömmar",
        checked: false
    },
    {
        id: 3,
        name: "En dröm som tar flera rader lorem ipsum",
        theme: "vardagsdrömmar",
        checked: false
    }
];

export function getUsername(): string | null {
    if (debug) {
        console.debug("getUsername");
        return name;
    }
    const stored = localStorage.getItem("username");
    return (stored !== null) ? stored : name;
}

export function setUsername(username: string): void {
    if (debug) {
        console.info("setUsername");
        return;
    }
    localStorage.setItem("username", username);
}

export function getThemes(): string[] {
    if (debug) {
        console.debug("getThemes");
        return themes;
    }
    const stored = localStorage.getItem("themes");
    const list: string[] = [];
    if (stored !== null) {
        const data = JSON.parse(stored) as string[];
        data.forEach(item => list.push(item));
    }
    return list;
}

export function setThemes(themes: string[]): boolean {
    if (debug) {
        console.debug("setThemes");
        return true;
    }
    localStorage.setItem("themes", JSON.stringify(themes));
    return true;
}

export function getDreams(): Dream[] {
    if (debug) {
        console.debug("getDreams");
        return dreams;
    }
    const stored = localStorage.getItem("dreams");
    const list: Dream[] = [];
    if (stored !== null) {
        const data = JSON.parse(stored) as Dream[];
        data.forEach(item => {
            let dream: Dream = {
                id: item.id,
                name: item.name,
                theme: item.theme,
                checked: item.checked
            };
            list.push(dream);
        });
    }
    return list;
}

export function setDreams(dreams: Dream[]): boolean {
    if (debug) {
        console.debug("setDreams");
        return true;
    }
    localStorage.setItem("dreams", JSON.stringify(dreams));
    return true;
}