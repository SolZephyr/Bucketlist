export function ThemeListItem(theme: string): HTMLLIElement {
    const li = document.createElement("li");
    li.dataset.id = theme.toString();
    const content = `<p>${theme}</p><img src="../assets/images/trash_delete.png" />`;
    li.innerHTML = content;
    return li;
}

export function ThemeListOption(theme: string): HTMLOptionElement {
    const option = document.createElement("option");
    option.innerText = theme;
    option.value = theme;
    return option;
}

export function ThemeListDefaultOption(name: string): HTMLOptionElement {
    const option = document.createElement("option");
    option.innerText = name;
    option.value = "";
    return option;
}