document.addEventListener("DOMContentLoaded", ()=> {
    //search_wrapper 밑에 카드 생성
    const searchWrapper = document.querySelector(".search_wrapper");
    const itemList = document.createElement("div");
    itemList.id = "item-list";

    searchWrapper.after(itemList);

    lostItems.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-image">
                <img src="${item.image}" alt="${item.title}" class="item-img">
            </div>
            <div class="card-content">
                <div class="title">
                    <h3 class="item-title">${item.title}</h3>
                </div>
                <div class="section">
                    <p class="item-location"><span>장소:</span> ${item.location}</p>
                    <p class="item-date"><span>일자:</span> ${item.date}</p>
                </div>
            </div>
        `;
        itemList.appendChild(card);
    })
})