// static/loadImages.js
(() => {
  const API_URL = 'https://pocali-backend.onrender.com/api/images';
  const grid = document.getElementById('photo-grid');

  // 페이지 로딩 후 즉시 비동기로 이미지 목록 불러오기
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.images || []);

      // 1) 갤러리 초기화 및 카드 생성
      grid.innerHTML = '';
      list.forEach(img => {
        const div = document.createElement('div');
        div.className = 'photo-card-container';
        div.innerHTML = `
          <img class="photo-card"
               src="${img.url}"
               alt="${img.filename}"
               data-group="${img.group}"
               data-member="${img.member}"
               data-category="${img.category}"
               data-title="${img.title}"
               data-version="${img.version}"
               data-unique="${img.unique_id}">
          <div class="subcat-label">${img.file_type}</div>
        `;
        grid.appendChild(div);
      });

      // 2) originalCards 전역에 담아서 UI 초기화 로직에서 사용
      window.originalCards = Array.from(
        grid.querySelectorAll('.photo-card-container')
      );

      // 3) 기존 UI 초기화 함수 호출 (정렬, 카운트 업데이트 등)
      if (typeof showById === 'function') showById();

      // 4) 이벤트 위임: 더블클릭으로 체크 토글
      grid.addEventListener('dblclick', e => {
        const card = e.target.closest('.photo-card-container');
        if (!card) return;
        const imgEl = card.querySelector('.photo-card');
        if (!imgEl) return;
        if (typeof toggleCheck === 'function') toggleCheck(imgEl);
      });

    } catch (err) {
      console.error('이미지 로딩 실패:', err);
      grid.innerHTML = '<p class="error">이미지를 불러올 수 없습니다.</p>';
    }
  });
})();
