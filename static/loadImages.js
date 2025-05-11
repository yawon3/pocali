// static/loadImages.js
(() => {
  const API_URL = 'https://pocali-backend.onrender.com/api/images';
  const grid = document.getElementById('photo-grid');

  window.addEventListener('DOMContentLoaded', () => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const list = Array.isArray(data) ? data : (data.images || []);
        grid.innerHTML = '';

        list.forEach(img => {
          const div = document.createElement('div');
          div.className = 'photo-card-container';
          div.innerHTML = `
            <img class="photo-card" src="${img.url}" alt="${img.filename}">
            <div class="subcat-label">${img.file_type}</div>
            <div class="overlay-text">${img.filename}</div>
          `;
          grid.appendChild(div);
        });

        // 기존 UI 초기화 로직 호출
        if (typeof showById === 'function') showById();
        if (typeof render === 'function') render();

        // 이벤트 위임: 단 한 번만 바인딩
        grid.addEventListener('dblclick', e => {
          const card = e.target.closest('.photo-card-container');
          if (!card) return;
          card.classList.toggle('checked');
          if (typeof updateCount === 'function') updateCount();
        });
      })
      .catch(err => {
        console.error('이미지 로딩 실패:', err);
        grid.innerHTML = '<p class="error">이미지를 불러올 수 없습니다.</p>';
      });
  });
})();
