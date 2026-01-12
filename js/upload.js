document.addEventListener("DOMContentLoaded", () => {
  const homeView = document.querySelector(".list-view");
  const formView = document.querySelector(".upload");
  const goHome = document.querySelector(".find_btn");
  const goForm = document.querySelector(".write_btn");
  const regForm = document.getElementById("regForm");
  const cancelBtn = document.getElementById("cancelBtn");
  const photoInput = document.getElementById("photo");
  const previewImg = document.getElementById("previewImg");
  const previewHint = document.getElementById("previewHint");

  function setTodayDate() {
    const dateInput = document.getElementById("date");
    if (!dateInput) return;
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  function resetPreview() {
    if (previewImg) {
      previewImg.removeAttribute("src");
      previewImg.style.display = "none";
    }
    if (previewHint) previewHint.style.display = "block";
  }

  function showHome() {
    formView.classList.add("hidden");
    homeView.classList.remove("hidden");
  }

  function showForm() {
    homeView.classList.add("hidden");
    formView.classList.remove("hidden");
    setTodayDate();
  }

  goHome?.addEventListener("click", showHome);
  goForm?.addEventListener("click", showForm);

  photoInput?.addEventListener("change", () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) {
      resetPreview();
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      previewImg.src = reader.result;
      previewImg.style.display = "block";
      previewHint.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  cancelBtn?.addEventListener("click", () => {
    regForm.reset();
    resetPreview();
    showHome();
  });


  regForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = regForm.title.value.trim();
    const place = regForm.place.value.trim();
    const date = regForm.date.value;
    const desc = regForm.desc.value.trim();
    const file = photoInput.files && photoInput.files[0];
    const category = regForm.category.value.trim();

    if (!file || !title || !place || !category) {
      alert("사진, 제목, 위치, 카테고리는 필수입니다.");
      return;
    }

    const reader = new FileReader(); // 1. reader 정의

    reader.onload = function () { // 2. 로드 이벤트 정의
      const newItem = {
        id: Date.now(),
        title,
        category,
        place,
        date,
        description: desc,
        img: reader.result
      };

      const items = JSON.parse(localStorage.getItem("lostItems") || "[]");
      items.push(newItem);
      localStorage.setItem("lostItems", JSON.stringify(items));

      alert("등록 완료.");
      regForm.reset();
      resetPreview();
      showHome();
      location.reload(); 
    };

    reader.readAsDataURL(file);
  });

});
