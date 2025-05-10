
 fetch('https://pocali-backend.onrender.com/api/images')
   .then(res => res.json())
   .then(payload => {
     // 백엔드가 { images: […] } 형태로 주므로
     const list = Array.isArray(payload)
                  ? payload
                  : (payload.images || []);
     const grid = document.getElementById('photo-grid');
     // 기존 내용 클리어
     grid.innerHTML = '';
     list.forEach(img => {     const div = document.createElement('div');
      div.className = 'photo-card-container';

      div.innerHTML = `
        <div class="subcat-label">${img.sub_category}</div>
        <img class="photo-card"
             src="${img.url}"
             alt="${img.member} ${img.title}"
             data-group="${img.group}"
             data-member="${img.member}"
             data-category="${img.category}"
             data-title="${img.title}"
             data-version="${img.version}"
             data-unique="${img.unique_id}">
      `;
      grid.appendChild(div);
    });

        // 기존 pocalist 스크립트가 사용하는 전역 render() 로 대체
        if (typeof render === 'function') {
          render();  
        }
  });
