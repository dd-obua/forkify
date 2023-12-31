import View from './view.js';
import previewView from './previewView.js';
import icons from '../../images/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map((result) => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
