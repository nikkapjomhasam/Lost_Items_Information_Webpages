let currentItems = [];

document.addEventListener("DOMContentLoaded", ()=> {

    const storedData = JSON.parse(localStorage.getItem("lostItems") || "[]");
    window.lostItems = [...storedData, ...lostItems];
    window.lostItems.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
    });

    currentItems = [...window.lostItems];

    //search_wrapper 밑에 카드 생성
    const searchWrapper = document.querySelector(".search_wrapper");
    const itemList = document.createElement("div");
    itemList.id = "item-list";
    searchWrapper.after(itemList);

    let currentPage = 1;
    const itemsPerPage = 8;

    window.applyFilters = function(selectedLocations = [], selectedCategories = [], searchTerm = "") {
        // 원본(window.lostItems)에서 필터링해서 currentItems에 다시 저장
        const query = searchTerm.toLowerCase().trim();
        currentItems = window.lostItems.filter(item => {
            const locMatch = selectedLocations.length === 0 || 
                             selectedLocations.includes(String(item.place || item.location));
            const catMatch = selectedCategories.length === 0 || 
                             selectedCategories.includes(item.category);
            const searchMatch = query === "" || 
                            item.title.toLowerCase().includes(query);
            return locMatch && catMatch && searchMatch;
        });
        currentPage = 1; 
        renderPage(currentPage);
    };

    const searchInput = document.querySelector(".search");
    const searchBtn = document.querySelector(".search_btn");

    searchBtn.addEventListener("click", () => {
        window.applyFilters([], [], searchInput.value);
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchBtn.click();
    });
    
    function renderPage(page) {
        itemList.innerHTML = ""; // 기존 목록 비우기
        
        // 데이터에서 출력할 구간 계산 (예: 1페이지면 0~5번 인덱스)
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const targetItems = currentItems.slice(start, end);

        targetItems.forEach((item) => {
            const card = document.createElement("div");
            card.className = "card";
            card.setAttribute("data-id", item.id);

            
            card.innerHTML = `
                <button class="card-btn"></button>
                <div class="card-image">
                    <img src="${item.img || item.image}" alt="${item.title}" class="item-img">
                </div>
                <div class="card-content">
                    <div class="title">
                        <h3 class="item-title">${item.title}</h3>
                    </div>
                    <div class="section">
                        <p class="item-location"><span>장소:</span> ${item.place || item.location}</p>
                        <p class="item-date"><span>일자:</span> ${item.date}</p>
                        <p class="item-desc" style="display:none;">${item.description || item.desc || "상세 설명이 없습니다."}</p>
                        <p class="item-location"><span>카테고리:</span> ${item.category}</p>
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
        const totalPages = Math.ceil(currentItems.length / itemsPerPage);
        
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