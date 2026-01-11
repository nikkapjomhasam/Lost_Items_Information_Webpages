const goReceipt = document.querySelector(".lost_btn");
const homeView = document.querySelector(".list-view");
const formView = document.getElementById("formView"); 
const receiptView = document.getElementById("receipt-view"); 

const STORAGE_KEY = "HY_LOST_BOARD_POSTS";

const $ = (id) => document.getElementById(id);

const boardBody = $("boardBody");
const searchForm = $("searchForm");
const searchInput = $("searchInput");

const newPostBtn = $("newPostBtn");
const postOverlay = $("postOverlay");
const closePost = $("closePost");
const cancelPost = $("cancelPost");

const postForm = $("postForm");
const postMsg = $("postMsg");

const pTitle = $("pTitle");
const pStatus = $("pStatus");
const pCategory = $("pCategory");
const pDate = $("pDate");
const pPlace = $("pPlace");
const pWriter = $("pWriter");
const pContact = $("pContact");
const pDesc = $("pDesc");

// 상세 모달 DOM
const detailOverlay = $("detailOverlay");
const closeDetail = $("closeDetail");
const closeDetail2 = $("closeDetail2");
const dStatus = $("dStatus");
const dCategory = $("dCategory");
const dDateLost = $("dDateLost");
const dPlace = $("dPlace");
const dWriter = $("dWriter");
const dContact = $("dContact");
const dViews = $("dViews");
const dCreatedAt = $("dCreatedAt");
const dDesc = $("dDesc");
const detailSub = $("detailSub");

// --------------------
// Storage helpers
// --------------------
function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function hideAllViews() {
    homeView?.classList.add("hidden");
    formView?.classList.add("hidden");
    receiptView?.classList.add("receipt-hidden"); // 게시판 전용 숨김 클래스
}

goReceipt?.addEventListener("click", () => {
    hideAllViews();
    receiptView?.classList.remove("receipt-hidden");
    render(posts); // 화면 전환 시 목록 갱신
});

document.querySelector(".find_btn")?.addEventListener("click", () => {
    hideAllViews();
    homeView?.classList.remove("hidden");
});

document.querySelector(".write_btn")?.addEventListener("click", () => {
    hideAllViews();
    formView?.classList.remove("hidden");
    if (typeof setTodayDate === "function") setTodayDate();
});


function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// --------------------
// Seed data
// --------------------
function seedIfEmpty(posts) {
  const hasNotice = posts.some(p => p && p.isNotice === true);

  const notice = {
    id: "notice-1",
    isNotice: true,
    status: "공지",
    category: "기타",
    title: "분실물 게시판 이용 안내 (제목에 물품/장소/시간을 꼭 적어주세요)",
    place: "",
    dateLost: "",
    writer: "관리자",
    contact: "",
    desc: "제목에 물품/장소/시간을 최대한 자세히 작성해 주세요.",
    views: 0,
    createdAt: "2026-01-10"
  };

  if (posts.length === 0) {
    return [
      notice,
      {
        id: 16,
        status: "분실",
        category: "지갑/카드",
        title: "학생증(한양대 ERICA) 분실했습니다. 본관 근처 추정",
        place: "본관",
        dateLost: "2026-01-10",
        writer: "준기",
        contact: "댓글 부탁",
        desc: "학생증 분실했습니다. 보신 분 댓글 부탁드려요.",
        views: 0,
        createdAt: "2026-01-10"
      },
      {
        id: 15,
        status: "보관중",
        category: "지갑/카드",
        title: "검은색 지갑 보관중입니다 (카페 앞에서 습득)",
        place: "카페",
        dateLost: "2026-01-10",
        writer: "익명",
        contact: "댓글",
        desc: "카페 앞에서 습득했고 현재 보관 중입니다.",
        views: 0,
        createdAt: "2026-01-10"
      },
      {
        id: 14,
        status: "분실",
        category: "전자기기",
        title: "에어팟(화이트) 케이스만 잃어버렸어요…",
        place: "셔틀버스",
        dateLost: "2026-01-09",
        writer: "익명",
        contact: "댓글",
        desc: "케이스만 분실했습니다. 혹시 보신 분 있나요?",
        views: 0,
        createdAt: "2026-01-09"
      }
    ];
  }

  if (!hasNotice) return [notice, ...posts];
  return posts;
}

// --------------------
// Helpers
// --------------------
function escapeHtml(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pillClass(status) {
  if (status === "공지") return "notice";
  if (status === "보관중") return "keep";
  if (status === "해결") return "done";
  return "lost";
}

function normalizeIdToNumber(id) {
  const n = Number(id);
  return Number.isFinite(n) ? n : -1;
}

function applySearch(posts, q) {
  const query = (q || "").trim().toLowerCase();
  if (!query) return posts;

  return posts.filter(p => {
    const hay = `${p.title} ${p.place} ${p.desc} ${p.category} ${p.writer}`.toLowerCase();
    return hay.includes(query);
  });
}

function sortPosts(posts) {
  const notices = posts.filter(p => p.isNotice);
  const normal = posts.filter(p => !p.isNotice);

  normal.sort((a, b) => {
    const an = normalizeIdToNumber(a.id);
    const bn = normalizeIdToNumber(b.id);
    if (an !== -1 && bn !== -1) return bn - an;

    const ad = String(a.createdAt ?? "");
    const bd = String(b.createdAt ?? "");
    return bd.localeCompare(ad);
  });

  return notices.concat(normal);
}

// --------------------
// Detail modal
// --------------------
function openDetail(post) {
  if (!detailOverlay) return;

  detailSub.textContent = post.title || "";

  dStatus.textContent = post.status || "-";
  dCategory.textContent = post.category || "-";
  dDateLost.textContent = post.dateLost || "-";
  dPlace.textContent = post.place || "-";
  dWriter.textContent = post.writer || "익명";
  dContact.textContent = post.contact || "-";
  dViews.textContent = String(post.views ?? 0);
  dCreatedAt.textContent = post.createdAt || "-";
  dDesc.textContent = post.desc || "";

  detailOverlay.classList.add("open");
  detailOverlay.setAttribute("aria-hidden", "false");
}

function closeDetailModal() {
  detailOverlay.classList.remove("open");
  detailOverlay.setAttribute("aria-hidden", "true");
}

closeDetail?.addEventListener("click", closeDetailModal);
closeDetail2?.addEventListener("click", closeDetailModal);
detailOverlay?.addEventListener("click", (e) => {
  if (e.target === detailOverlay) closeDetailModal();
});

// --------------------
// Render
// --------------------
function render(posts) {
  const q = searchInput?.value ?? "";
  const filtered = applySearch(posts, q);
  const ordered = sortPosts(filtered);

  boardBody.innerHTML = ordered.map((p) => {
    const noText = p.isNotice ? "" : escapeHtml(p.id);
    const dateText = escapeHtml(String(p.createdAt ?? "").slice(0, 10));
    const writerText = escapeHtml(p.writer || "익명");
    const placeMeta = p.place ? `<span class="placeMeta">· ${escapeHtml(p.place)}</span>` : "";

    return `
      <div class="row item" role="row">
        <div class="cell no" role="cell">${noText}</div>
        <div class="cell title" role="cell">
          <span class="pill ${pillClass(p.status)}">${escapeHtml(p.status)}</span>
          <a href="#" class="titleLink" data-open="${escapeHtml(p.id)}">${escapeHtml(p.title)}</a>
          ${placeMeta}
        </div>
        <div class="cell author" role="cell">${writerText}</div>
        <div class="cell date" role="cell">${dateText}</div>
      </div>
    `;
  }).join("");

  boardBody.querySelectorAll("[data-open]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.getAttribute("data-open");
      const post = posts.find(x => String(x.id) === String(id));
      if (!post) return;

      post.views = (post.views ?? 0) + 1;
      savePosts(posts);

      openDetail(post);
    });
  });
}

// --------------------
// Write modal controls
// --------------------
function openWriteModal() {
  postOverlay.classList.add("open");
  postOverlay.setAttribute("aria-hidden", "false");

  if (postMsg) {
    postMsg.textContent = "";
    postMsg.className = "formMsg";
  }

  postForm.reset();

  // 기본값: 오늘 날짜
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  pDate.value = `${yyyy}-${mm}-${dd}`;

  setTimeout(() => pTitle.focus(), 0);
}

function closeWriteModal() {
  postOverlay.classList.remove("open");
  postOverlay.setAttribute("aria-hidden", "true");
}

// --------------------
// Main
// --------------------
let posts = seedIfEmpty(loadPosts());
savePosts(posts);
render(posts);

// 검색
searchForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  render(posts);
});

// 글쓰기 모달
newPostBtn?.addEventListener("click", openWriteModal);
closePost?.addEventListener("click", closeWriteModal);
cancelPost?.addEventListener("click", closeWriteModal);

postOverlay?.addEventListener("click", (e) => {
  if (e.target === postOverlay) closeWriteModal();
});

// ESC 처리
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (postOverlay.classList.contains("open")) closeWriteModal();
    if (detailOverlay.classList.contains("open")) closeDetailModal();
  }
});

// 등록
postForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = pTitle.value.trim();
  const status = pStatus.value;
  const category = pCategory.value;
  const dateLost = pDate.value;
  const place = pPlace.value.trim();
  const writer = (pWriter.value.trim() || "익명");
  const contact = pContact.value.trim();
  const desc = pDesc.value.trim();

  if (!title || !dateLost || !place || !contact || !desc) {
    postMsg.textContent = "필수 항목을 모두 입력해 주세요.";
    postMsg.className = "formMsg err";
    return;
  }

  const maxId = posts.reduce((m, p) => {
    const n = normalizeIdToNumber(p.id);
    return n > m ? n : m;
  }, 0);
  const newId = maxId + 1;

  const now = new Date();
  const createdAt =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const newPost = {
    id: newId,
    status,
    category,
    title,
    place,
    dateLost,
    writer,
    contact,
    desc,
    views: 0,
    createdAt
  };

  // 공지 맨 위 유지
  const noticeIdx = posts.findIndex(p => p.isNotice);
  if (noticeIdx === 0) posts.splice(1, 0, newPost);
  else posts.unshift(newPost);

  savePosts(posts);
  render(posts);

  postMsg.textContent = "등록 완료!";
  postMsg.className = "formMsg ok";

  setTimeout(closeWriteModal, 250);
});
