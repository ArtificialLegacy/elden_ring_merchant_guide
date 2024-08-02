const app = document.getElementById("app")

function groupComponent(group) {
    return /*html*/`
        <div class="group">
            <p>${group.name}</p>
            <div class="group-list">
                ${group.list.map(merchant => {
                    return /*html*/`
                    <div>
                        <input type="checkbox">
                        <label>${merchant.name}</label>
                    </div>
                    `
                }).join("")}
            </div>
        </div>
    `
}

for (let group of groups) {
    app.insertAdjacentHTML("beforeend", groupComponent(group))
}