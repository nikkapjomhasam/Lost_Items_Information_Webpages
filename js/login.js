const ACCOUNTS = { admin: "admin1234", user: "user1234" };

document.addEventListener("DOMContentLoaded", () => {
    const loginOverlay = document.getElementById("loginOverlay");
    const openLoginBtn = document.getElementById("openLoginBtn");
    const closeLoginX = document.getElementById("closeLoginX");
    const loginForm = document.getElementById("loginForm");

    // 버튼 클릭 이벤트 (로그인/로그아웃 제어)
    openLoginBtn?.addEventListener("click", (e) => {
        if (openLoginBtn.classList.contains("logged-in")) {
            if (confirm("로그아웃 하시겠습니까?")) {
                logout();
            }
        } else {
            openLoginModal();
        }
    });

    function openLoginModal() {
        loginOverlay.classList.add("open");
        const msg = document.getElementById("loginMsg");
        if (msg) msg.textContent = ""; // 메시지 초기화
        document.getElementById("idInput").value = "";
        document.getElementById("pwInput").value = "";
    }

    function logout() {
        openLoginBtn.textContent = "로그인";
        openLoginBtn.classList.remove("logged-in");
        alert("로그아웃 되었습니다.");
    }

    const closeLogin = () => loginOverlay.classList.remove("open");
    closeLoginX?.addEventListener("click", closeLogin);
    loginOverlay?.addEventListener("click", (e) => {
        if (e.target === loginOverlay) closeLogin();
    });

    // 로그인 처리 부분 수정
    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("idInput").value.trim();
        const pw = document.getElementById("pwInput").value.trim();
        const msg = document.getElementById("loginMsg");

        if (ACCOUNTS[id] === pw) {
            // [수정] 아래 메시지 출력 대신 alert을 사용합니다.
            alert("로그인 성공!"); 
            
            openLoginBtn.textContent = "로그아웃";
            openLoginBtn.classList.add("logged-in");
            
            closeLogin(); // alert 확인 누르면 바로 모달 닫기
        } else {
            // 실패했을 때는 여전히 하단에 에러 메시지를 띄워주는 것이 사용자 경험상 좋습니다.
            if (msg) {
                msg.textContent = "아이디 또는 비밀번호를 확인하세요.";
                msg.className = "msg err";
            }
        }
    });
});