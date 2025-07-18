
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

export enum LSKEY {
    USERNAME = "username",
    DREAMS = "dreams",
    THEMES = "themes"
}

export const clear = <T>(key: LSKEY) => {
    localStorage.removeItem(key);
};

export const save = <T>(key: LSKEY, data: T) => {
    return new Promise((resolve, reject) => {
        localStorage.setItem(key, JSON.stringify(data));
        return resolve(data);
    });
};

export const load = <T>(key: LSKEY) => {
    return new Promise((resolve, reject) => {
        const data = localStorage.getItem(key);
        if (data === undefined || data === null)
            return reject();
        return data ? resolve(JSON.parse(data)) : reject;
    });
};