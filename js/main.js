document.addEventListener("DOMContentLoaded", () => {
    const categoryBtn = document.getElementById('category');

    if (categoryBtn) {
        // filter.js에 선언된 openModal 함수를 연결
        categoryBtn.onclick = () => {
            if (typeof openModal === "function") {
                openModal();
            } else {
                console.error("filter.js가 로드되지 않았거나 openModal 함수가 없습니다.");
            }
        };
    } else {
        console.error("카테고리 버튼을 찾을 수 없습니다.");
    }
});