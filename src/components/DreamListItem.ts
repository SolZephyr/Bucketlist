import Dream from "../models/Dream";

export default function DreamListItem(dream: Dream): HTMLLIElement {
    const id = dream.id;
    const name = dream.name;
    const theme = dream.theme;
    const checked = dream.checked;

    const li = document.createElement("li");
    li.classList.add("dream-list_item");
    li.dataset.id = id.toString();

    const content = `<input class="dream-check" type="checkbox" name="dream-check" id="dream-check-${id}"}">
                    <label for="dream-check-${id}">${name}, <span class="dream-theme">${theme}</span></label>
                    <button type="button"><img src="../assets/images/trash_delete.png"></button>`;
    li.innerHTML = content;
    //
    const input = li.querySelector('input[type="checkbox"]') as HTMLInputElement;
    input.checked = checked;
    return li;
}