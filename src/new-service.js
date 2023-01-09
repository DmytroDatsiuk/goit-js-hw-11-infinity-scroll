import axios, { all } from 'axios';
import Notiflix from 'notiflix';

export default class NewsApiService {
  constructor() {
    this.url = 'https://pixabay.com/api/';
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchArticles() {
    const params = {
      key: '32602095-27dbade4d0732e174c3b141f5',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.per_page,
      page: this.page,
    };

    const response = await axios.get(this.url, { params }).then(response => {
      const allPages = Math.ceil(response.data.totalHits / this.per_page);

      if (this.page > allPages) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );

        return;
      }
      this.incrementPage();

      return response.data;
    });

    return response;
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
