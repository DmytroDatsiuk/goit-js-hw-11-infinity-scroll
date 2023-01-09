import NewsApiService from './new-service';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
window.addEventListener('scroll', throttle(checkPosition, 250));
window.addEventListener('resize', throttle(checkPosition, 250));

function onSearch(e) {
  e.preventDefault();
  clearGalleryMarkup();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  newsApiService.resetPage();

  newsApiService
    .fetchArticles()
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      }

      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      appendPhotoHitsMurkup(data.hits);
    })
    .catch(error => {
      console.log(error);
    });
}

function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;

  const threshold = height - screenHeight / 4;

  const position = scrolled + screenHeight;

  if (position >= threshold) {
    newsApiService
      .fetchArticles()
      .then(data => {
        appendPhotoHitsMurkup(data.hits);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function appendPhotoHitsMurkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', createPhotoMarkup(hits));
  let gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
  gallery.refresh();
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
    <a class='gallery__link' href='${largeImageURL}'>
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width='400px' />
  </a>
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

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}
