document.addEventListener("DOMContentLoaded", ()=> {
    //search_wrapper 밑에 카드 생성
    const searchWrapper = document.querySelector(".search_wrapper");
    const itemList = document.createElement("div");
    itemList.id = "item-list";
    searchWrapper.after(itemList);

    let currentPage = 1;
    const itemsPerPage = 8;

    
function renderPage(page) {
        itemList.innerHTML = ""; // 기존 목록 비우기
        
        // 데이터에서 출력할 구간 계산 (예: 1페이지면 0~5번 인덱스)
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const targetItems = lostItems.slice(start, end);

        targetItems.forEach((item) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <button class="card-btn"></button>
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
        });
        
        // 페이지 버튼도 매번 다시 생성
        renderPaginationButtons();
    }

    // [3] 페이지 버튼 생성 함수
    function renderPaginationButtons() {
        const totalPages = Math.ceil(lostItems.length / itemsPerPage);
        
        // 기존 버튼 영역 삭제 후 다시 생성
        let paginationContainer = document.querySelector(".pagination-container");
        if (paginationContainer) paginationContainer.remove();

        paginationContainer = document.createElement("div");
        paginationContainer.className = "pagination-container";

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if (i === currentPage) btn.classList.add("active");

            btn.onclick = () => {
                currentPage = i;
                renderPage(currentPage);
                window.scrollTo(0, 0); // 클릭 시 화면 상단으로 이동
            };
            paginationContainer.appendChild(btn);
        }
        itemList.after(paginationContainer);
    }

    // 초기 실행
    renderPage(currentPage);
});