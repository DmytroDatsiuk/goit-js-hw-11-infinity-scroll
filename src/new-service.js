import axios, { all } from 'axios';

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

    const response = await axios.get(this.url, { params });

    return response.data;
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
