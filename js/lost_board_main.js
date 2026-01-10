document.addEventListener("DOMContentLoaded", () => {
  // 1. 화면 전환용 변수
  const homeView = document.querySelector(".list-view");
  const formView = document.querySelector(".upload");
  const boardView = document.getElementById("boardView");
  const goBoard = document.querySelector(".lost_btn"); // 분실물 접수 버튼

  // 2. 게시판 데이터 및 렌더링 변수
  const STORAGE_KEY = "HY_LOST_BOARD_POSTS";
  const boardBody = document.getElementById("boardBody");
  
  // 3. 화면 전환 함수 (게시판 활성화)
  goBoard?.addEventListener("click", () => {
    homeView.classList.add("hidden");
    formView.classList.add("hidden");
    boardView.classList.remove("hidden");
    renderBoard(); // 게시판 목록 불러오기
  });

  // 4. 게시판 데이터 로드 및 출력
  function renderBoard() {
    const rawData = localStorage.getItem(STORAGE_KEY);
    const posts = rawData ? JSON.parse(rawData) : [
      { id: 1, status: "공지", title: "분실물 게시판 안내", writer: "관리자", createdAt: "2026-01-11", place: "공지" }
    ];

    boardBody.innerHTML = posts.map(p => `
      <div class="row item" role="row">
        <div class="cell no">${p.id}</div>
        <div class="cell title">
          <span class="pill ${p.status === '보관중' ? 'keep' : 'lost'}">${p.status}</span>
          <a href="#" class="titleLink" data-id="${p.id}">${p.title}</a>
          ${p.place ? `<span class="placeMeta">· ${p.place}</span>` : ""}
        </div>
        <div class="cell author">${p.writer}</div>
        <div class="cell date">${p.createdAt}</div>
      </div>
    `).join("");

    // 상세 보기 클릭 이벤트 연결
    boardBody.querySelectorAll(".titleLink").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openBoardDetail(link.dataset.id, posts);
      });
    });
  }

  // 5. 게시글 상세 보기 모달
  const detailOverlay = document.getElementById("lb-detailOverlay");
  
  function openBoardDetail(id, posts) {
    const post = posts.find(p => String(p.id) === String(id));
    if (!post) return;

    document.getElementById("lb-detailTitle").textContent = post.title;
    document.getElementById("lb-dStatus").textContent = post.status;
    document.getElementById("lb-dPlace").textContent = post.place;
    document.getElementById("lb-dWriter").textContent = post.writer;
    document.getElementById("lb-dContact").textContent = post.contact || "정보 없음";
    document.getElementById("lb-dDesc").textContent = post.desc || "내용 없음";

    detailOverlay.style.display = "flex";
    detailOverlay.setAttribute("aria-hidden", "false");
  }

  // 모달 닫기 (X 버튼 및 닫기 버튼)
  document.getElementById("lb-closeDetail")?.addEventListener("click", () => {
    detailOverlay.style.display = "none";
  });
  document.getElementById("lb-closeDetail2")?.addEventListener("click", () => {
    detailOverlay.style.display = "none";
  });

  // 6. 글 올리기 모달 열기/닫기
  const postOverlay = document.getElementById("lb-postOverlay");
  document.getElementById("newPostBtn")?.addEventListener("click", () => {
    postOverlay.style.display = "flex";
  });
  document.getElementById("lb-closePost")?.addEventListener("click", () => {
    postOverlay.style.display = "none";
  });
  document.getElementById("lb-cancelPost")?.addEventListener("click", () => {
    postOverlay.style.display = "none";
  });
});