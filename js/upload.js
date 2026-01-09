document.addEventListener("DOMContentLoaded", () => {
  const listView = document.querySelector(".main");   // 메인 리스트
  const uploadView = document.querySelector(".upload"); // 등록 폼
  
  const findBtn = document.querySelector(".find_btn");
  const writeBtn = document.querySelector(".write_btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  const regForm = document.querySelector(".reg-form");
  const photoInput = document.querySelector(".input-photo");
  const previewImg = document.querySelector(".preview-img");
  const previewHint = document.querySelector(".preview-hint");

  // 화면 전환 스위치
  function changeView(viewName) {
    listView.classList.add("hidden");
    uploadView.classList.add("hidden");

    switch (viewName) {
      case "find":
        listView.classList.remove("hidden");
        break;
      case "write":
        uploadView.classList.remove("hidden");
        // 날짜 자동 세팅
        const dateInput = document.querySelector(".input-date");
        if(dateInput) dateInput.value = new Date().toISOString().substring(0, 10);
        break;
    }
  }

  findBtn?.addEventListener("click", () => changeView("find"));
  writeBtn?.addEventListener("click", () => changeView("write"));
  
  cancelBtn?.addEventListener("click", () => {
    regForm.reset();
    previewImg.style.display = "none";
    previewHint.style.display = "block";
    changeView("find");
  });

  // 사진 미리보기 로직
  photoInput?.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewImg.style.display = "block";
        previewHint.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });
});