const app = document.getElementById("app")
const groupSelector = document.getElementById("group-selectors")

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
                            <input id="${merchant.id}" class="merchant-selector" type="checkbox" onchange="renderItems();">
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

function renderItems() {
    const itemList = document.getElementById("item-list")
    itemList.textContent = ""

    const elements = document.querySelectorAll("input.merchant-selector:checked")
    let selected = []
    for (const element of elements) {
        selected.push(element.id)
    }

    let itemPool = []

    for (const group of groups) {
        for (const merchant of group.list) {
            if (selected.includes(merchant.id)) {
                merchant.stock.forEach(v => {
                    const ok = itemPool.reduce((acc, iv) => {
                        if (v[0] === iv.item) return false
                        return acc
                    }, true)

                    if (ok) itemPool.push({
                        item: v[0],
                        cost: v[1],
                        merchant: merchant,
                    })
                })
            }
        }
    }

    if (itemPool.length === 0) return

    itemList.insertAdjacentHTML("beforeend", itemTableComponent(itemPool))
}

function itemTableComponent(items) {
    return /*html*/`
        <table class="item-table">
            <thead><tr>
                <th>Name</th>
                <th>Cost</th>
                <th>Source</th>
                <th>Location</th>
            </tr></thead>
            <tbody>
                ${items.map(item => {
                    return /*html*/`
                        <tr>
                            <td>${item.item.name}</td>
                            <td>${item.cost}</td>
                            <td>${item.merchant.name}<a href="${item.merchant.link}" target="_blank">🔗</a></td>
                            <td>${item.merchant.location}</td>
                        </tr>
                    `
                }).join("")}
            </tbody>
        </table>
    `
}