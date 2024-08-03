const app = document.getElementById("app")
const groupSelector = document.getElementById("groupSelectors")

for (let group of groups) {
    groupSelector.insertAdjacentHTML("beforeend", groupComponent(group))
}

function groupComponent(group) {
    return /*html*/`
        <div class="group">
            <div class="top">
                <p>${group.name}</p>
            </div>
            <div class="bottom">
                <div class="group-list">
                    ${group.list.map(merchant => {
                        return /*html*/`
                        <div>
                            <input id="${merchant.id}" type="checkbox">
                            <label for="${merchant.id}">${merchant.name}</label>
                            <a href="${merchant.link}" target="_blank">🔗</a>
                        </div>
                        `
                    }).join("")}
                </div>
            </div>
        </div>
    `
}