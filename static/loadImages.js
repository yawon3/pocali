// static/loadImages.js

(() => {
  const API_URL = 'https://pocali-backend.onrender.com/api/images';
  const grid = document.getElementById('photo-grid');

  // DOM이 준비된 후 실행
  window.addEventListener('DOMContentLoaded', () => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        // 배열 추출: payload.images 또는 payload 자체가 배열
        const list = Array.isArray(data) ? data : (data.images || []);
        grid.innerHTML = '';  // 기존 내용 지우기

        list.forEach(img => {
          const div = document.createElement('div');
          div.className = 'photo-card-container';
          div.innerHTML = `
            <div class="subcat-label">${img.sub_category || img.file_type}</div>
            <img class="photo-card"
                 src="${img.url}"
                 alt="${img.filename}"
                 data-group="${img.group}"
                 data-member="${img.member}"
                 data-category="${img.category}"
                 data-title="${img.title}"
                 data-version="${img.version}"
                 data-unique="${img.unique_id}">
          `;
          grid.appendChild(div);
        });

        // 기존 pocalist 스크립트 렌더/이벤트 바인딩 호출
        if (typeof showById === 'function') {
          showById();
        }
      })
      .catch(err => {
        console.error('이미지 로딩 중 오류:', err);
        grid.innerHTML = '<p>이미지를 불러올 수 없습니다.</p>';
      });
  });
})();
