// ./js/card-modal.js
document.addEventListener("click", function (e) {
  const overlay = document.getElementById("overlay");
  const card = e.target.closest(".card");
  
  if (card) {
    const itemId = parseInt(card.getAttribute("data-id"));
    const itemData = window.lostItems.find(item => item.id === itemId);

    if (itemData) {
    // 2. 카드 내부에 적힌 텍스트들을 직접 추출
    const imgPadding = card.querySelector(".item-img").src;
    const title = card.querySelector(".item-title").innerText;
    const location = card.querySelector(".item-location").innerText;
    const date = card.querySelector(".item-date").innerText;


    // 3. 모달 엘리먼트에 데이터 삽입
    document.getElementById("bigImg").src = imgPadding;
    document.getElementById("titleText").innerText = title;
    document.getElementById("placeText").innerText = location; 
    document.getElementById("dateText").innerText = date;
    document.getElementById("descText").innerText = itemData.description;
    document.getElementById("descText").innerText = itemData.category;

    // 4. 모달 표시
    overlay.style.display = "flex";
  }
  }

  // 5. 닫기 로직 (X 버튼 클릭 OR 배경 클릭)
  // closest("#close")를 사용하면 X 아이콘 자체를 눌러도 잘 닫힙니다.
  if (e.target.closest("#close") || e.target === overlay) {
    overlay.style.display = "none";
  }
});

// 6. ESC 키로 닫기 (별도 이벤트 리스너)
document.addEventListener("keydown", (e) => {
  const overlay = document.getElementById("overlay");
  if (e.key === "Escape" && overlay.style.display === "flex") {
    overlay.style.display = "none";
  }
});