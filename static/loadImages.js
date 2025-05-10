 fetch('https://pocali-backend.onrender.com/api/images')
   .then(res => res.json())
   .then(payload => {
     // payload 가 { images: [...] } 이면 그 배열을, 
     // 아니면 payload 자체를 배열로 간주
     const data = Array.isArray(payload)
                  ? payload
                  : (payload.images || []);

    const grid = document.getElementById('photo-grid');
    data.forEach(img => {
      const div = document.createElement('div');
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
