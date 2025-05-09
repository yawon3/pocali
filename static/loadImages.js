fetch('/api/images')
  .then(res => res.json())
  .then(images => {
    const grid = document.getElementById('photo-grid');
    images.forEach(img => {
      const div = document.createElement('div');
      div.className = 'photo-card-container';

      div.innerHTML = `
        <div class="subcat-label">${img.sub_category}</div>
        <img class="photo-card"
             src="/static/images/${img.sub_category}/${img.filename}"
             alt="${img.member} ${img.title}"
             data-group="${img.group}"
             data-member="${img.member}"
             data-category="${img.category}"
             data-title="${img.title}"
             data-version="${img.version}"
             data-unique="${img.unique}">
      `;
      grid.appendChild(div);
    });
  });
