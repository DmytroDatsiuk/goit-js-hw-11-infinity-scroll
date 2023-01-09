import NewsApiService from './new-service';
// import Notiflix from 'notiflix';
// const axios = require('axios').default;

const refs = {
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  gallery: document.querySelector('.gallery'),
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  refs.loadMoreBtn.classList.remove('visually-hidden');

  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService
    .fetchArticles()
    .then(data => {
      console.log('data.hits', data.hits)
      // console.log(data.totalHits)
      // Notiflix.Notify.
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      return appendPhotoHitsMurkup(data.hits);
    })
    .catch(error => {});
}

function onLoadMore(e) {
  console.log(data.hits)
  newsApiService.fetchArticles().then(data => appendPhotoHitsMurkup(data.hits));
}
// console.log('hi')

function appendPhotoHitsMurkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', createPhotoMarkup(hits));
}

function createPhotoMarkup(searchQuery) {
  return searchQuery.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width='400px' />
  <div class="info">
    <div>
      <p class="info-item">
        <b>Likes</b>
      <p class="info-item">${likes}</p>
      </p>
    </div>
    <div>
      <p class="info-item">
        <b>Views</b>

      </p>
      <p class="info-item">${views}</p>
    </div>
    <div>
      <p class="info-item">
        <b>Comments</b>
        <p class="info-item">${comments}</p>
      </p>
    </div>
    <div>
      <p class="info-item">
        <b>Downloads</b>
        <p class="info-item">${downloads}</p>
      </p>
    </div>
  </div>
</div>`
  );
}

console.log('hi')