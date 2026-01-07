document.addEventListener("DOMContentLoaded", () => {
    // 1. 요소 찾기
    const homeView = document.getElementById("1");
    const formView = document.getElementById("2");
    const writeBtn = document.querySelector(".write_btn"); 
    const findBtn = document.querySelector(".find_btn");   
    const cancelBtn = document.getElementById("cancelBtn");
    const photoInput = document.getElementById("photo");
    const previewImg = document.getElementById("previewImg");

    // --- [기능 1] 화면 전환 ---
    function showHome() {
        formView.classList.add("hidden");
        homeView.classList.remove("hidden");
    }
    function showForm() {
        homeView.classList.add("hidden");
        formView.classList.remove("hidden");
        // 오늘 날짜 자동 세팅
        const dateInput = document.getElementById("date");
        if(dateInput) dateInput.value = new Date().toISOString().substring(0, 10);
    }

    if(writeBtn) writeBtn.addEventListener("click", showForm);
    if(findBtn) findBtn.addEventListener("click", showHome);
    if(cancelBtn) cancelBtn.addEventListener("click", showHome);

    // --- [기능 2] 사진 미리보기 ---
    if(photoInput) {
        photoInput.addEventListener("change", () => {
            const file = photoInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImg.src = e.target.result;
                    previewImg.style.display = "block";
                    const hint = document.getElementById("previewHint");
                    if(hint) hint.style.display = "none";
                };
                reader.readAsDataURL(file);
            }
        });
    }
});