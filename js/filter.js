// 모달 열기
function openModal() {
    const modal = document.getElementById('fillter-modal');
    if (modal) {
        modal.style.display = 'block';
        updateTags(); 
    }
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('fillter-modal');
    if (modal) modal.style.display = 'none';
}

// 옵션 버튼 클릭 (active 토글)
function selectOption(btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateTags(); 
}

// 상단 파란색 태그 갱신
function updateTags() {
    const tagContainer = document.getElementById('selected-tags');
    if (!tagContainer) return;
    
    tagContainer.innerHTML = '';
    const activeButtons = document.querySelectorAll('.opt-btn.active');
    
    activeButtons.forEach(btn => {
        if(btn.innerText === "전체") return;
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerText = btn.innerText + ' ✕';
        tagContainer.appendChild(tag);
    });
}

// 적용하기 버튼 로직
function applyFilters() {
    closeModal();
    // 여기에 실제 데이터 필터링 로직 추가 예정
}

// 배경 클릭 시 닫기
window.addEventListener('click', (event) => {
    const modal = document.getElementById('fillter-modal');
    if (event.target == modal) closeModal();
});