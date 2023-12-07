import View from './view';
import icons from '../../images/icons.svg';
import { RESULTS_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const currentPage = this._data.page;

    // On page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) return `Page 1 and others.`;

    // On the last page
    if (currentPage === numPages && numPages > 1) return `Last page.`;

    // On any other page
    if (currentPage < numPages) return `Any other page.`;

    // On page 1 and there are no other pages
    return `Only one page.`;
  }
}

export default new PaginationView();
