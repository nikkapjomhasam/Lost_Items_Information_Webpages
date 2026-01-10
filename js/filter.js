// 요소 가져오기 (index.html의 카테고리 버튼과 연결)
const openBtn = document.querySelector(".category_btn"); // 메인 페이지의 필터 버튼
const closeBtn = document.getElementById("closeFilter");
const filterOverlay = document.getElementById("filterOverlay");
const filterModal = document.getElementById("filterModal");


const resetBtn = document.getElementById("resetBtn");
const applyBtn = document.getElementById("applyBtn");

// 모달 열기
function openModal() {
  filterOverlay.classList.remove("hidden"); // hidden 클래스 제거
  filterOverlay.classList.add("is-open");
  filterOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// 모달 닫기
function closeModal() {
  filterOverlay.classList.add("hidden"); // hidden 클래스 추가
  filterOverlay.classList.remove("is-open");
  filterOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// 이벤트 연결
if (openBtn) openBtn.addEventListener("click", openModal);
if (closeBtn) closeBtn.addEventListener("click", closeModal);

// 바깥 영역 클릭 시 닫기
filterOverlay.addEventListener("click", (e) => {
  if (e.target === filterOverlay) closeModal();
});

// ESC 키로 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !filterOverlay.classList.contains("hidden")) {
    closeModal();
  }
});

// 섹션 접기/펼치기(아코디언)
document.querySelectorAll(".section-head").forEach((head) => {
  head.addEventListener("click", () => {
    const expanded = head.getAttribute("aria-expanded") === "true";
    head.setAttribute("aria-expanded", String(!expanded));
    
    const content = head.nextElementSibling;
    if (content) {
      content.style.display = expanded ? "none" : "block";
      // 화살표 방향 변경 (CSS에 chevron 관련 설정이 있을 경우)
      const chevron = head.querySelector(".chevron");
      if (chevron) chevron.textContent = expanded ? "⌄" : "⌃";
    }
  });
});

// 초기화
resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".chk").forEach((chk) => {
    chk.checked = false;
  });

  if (typeof window.applyFilters === "function") {
    window.applyFilters([], []);
  }
});

// 적용 버튼 클릭 (필터 로직)
applyBtn.addEventListener("click", () => {
  const selectedLocations = [];
  const selectedCategories = [];
  
  // 체크된 장소(value: "1", "2", "3")만 수집
  document.querySelectorAll('input[name="location"]:checked').forEach((chk) => {
    selectedLocations.push(chk.value);
  });

  document.querySelectorAll('input[name="category"]:checked').forEach((chk) => {
    selectedCategories.push(chk.value);
  });

  console.log("선택된 장소 코드:", selectedLocations);
  console.log("선택된 카테고리:", selectedCategories);

if (typeof window.applyFilters === "function") {
    window.applyFilters(selectedLocations, selectedCategories);
  } else {
    console.error("main.js의 applyFilters 함수를 찾을 수 없습니다.");
  }

  closeModal();
});