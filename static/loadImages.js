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
        // { images: [...] } 또는 그냥 [...] 형태 지원
        const list = Array.isArray(data)
          ? data
          : (data.images || []);

        grid.innerHTML = '';  // 비우고 시작

        list.forEach(img => {
          const div = document.createElement('div');
          div.className = 'photo-card-container';

          div.innerHTML = `
            <img 
              class="photo-card" 
              src="${img.url}" 
              alt="${img.filename}"
            >
            <div class="subcat-label">${img.file_type}</div>
            <div class="overlay-text">${img.filename}</div>
          `;
          grid.appendChild(div);
        });

        // 기존 UI 스크립트 (showById, render 등)을 호출
        if (typeof showById === 'function') showById();
      })
      .catch(err => {
        console.error('이미지 로딩 실패:', err);
        grid.innerHTML = '<p class="error">이미지를 불러올 수 없습니다.</p>';
      });
  });
})();
