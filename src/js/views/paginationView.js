import View from './view';
import icons from '../../images/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (event) => {
      const btn = event.target.closest('button');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const currentPage = this._data.page;

    // On page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>  
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // On the last page
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    // On any other page
    if (currentPage < numPages && currentPage !== 1) {
      return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // On page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
