class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElement.querySelector('.search_field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector('.search_field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', (event) => {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
