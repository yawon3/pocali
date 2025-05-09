fetch('https://pocali-backend.onrender.com/api/images')
  .then(res => res.json())
  .then(data => {
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

    renderImages(data); // 이 부분도 맨 아래로 이동
  });
